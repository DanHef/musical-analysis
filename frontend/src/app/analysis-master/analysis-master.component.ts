import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import WaveSurfer from 'wavesurfer.js';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js';
import RegionPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.js';
import { environment } from '../../environments/environment';
import TimelinesChart, { Group } from 'timelines-chart';

@Component({
  selector: 'app-analysis-master',
  templateUrl: './analysis-master.component.html',
  styleUrls: ['./analysis-master.component.css']
})
export class AnalysisMasterComponent implements OnInit {
  analysisSessionID = '';
  seletedAnalysisSessionID = '';
  selectedAnalysis;
  wavesurfer;
  analysis;
  statistics;
  displayedColumns: string[] = ['id', 'started', 'stopped', 'delete'];
  timelineChart;
  statisticsData;
  sessionDurationInSeconds;

  constructor(private readonly httpClient: HttpClient) { }

  public ngOnInit() {
    this.wavesurfer = WaveSurfer.create({
      container: '#wavesurfer',
      barHeight: 4,
      plugins: [
        CursorPlugin.create(),
        RegionPlugin.create({
          dragSelection: true
        }),
        TimelinePlugin.create({
          container: '#wavesurfer-timeline'
        })
      ]
    });

    this.wavesurfer.load(environment.audioEndpoint + '/Trauer-Anfang.mp3');

    this.loadAnalysis();
  }

  public createAnalysisSession() {
    this.httpClient.post(environment.apiEndpoint + '/analysis', {
      id: this.analysisSessionID
    }).subscribe(async function() {
      await this.loadAnalysis();
      this.seletedAnalysisSessionID = this.analysisSessionID;
      await this.loadAnalysisById(this.seletedAnalysisSessionID);
    }.bind(this));
  }

  public async startMusic() {
    await this.httpClient.put(environment.apiEndpoint + '/analysis/' + this.seletedAnalysisSessionID, {
      started: new Date().toISOString()
    }).toPromise();

    this.loadAnalysis();
    this.loadAnalysisById(this.seletedAnalysisSessionID);

    this.wavesurfer.play();
  }

  public async stopMusic() {
    await this.httpClient.put(environment.apiEndpoint + '/analysis/' + this.seletedAnalysisSessionID, {
      stopped: new Date().toISOString()
    }).toPromise();

    this.loadAnalysis();
    this.loadAnalysisById(this.seletedAnalysisSessionID);

    this.wavesurfer.stop();
  }

  public async onDelete(analysis) {
    await this.httpClient.delete(environment.apiEndpoint + '/analysis/' + analysis.id).toPromise();
    this.loadAnalysis();
  }

  public onSessionSelected() {
    this.loadAnalysisById(this.seletedAnalysisSessionID);
  }

  public async onStatisticsRefresh() {
    this.statisticsData = await this.loadAnalysisStatistics();
    this.loadAnalysisById(this.seletedAnalysisSessionID);

    // tslint:disable-next-line:forin
    for (const user in this.statisticsData) {
      const userParts = this.statisticsData[user].partData;

      for (const part of userParts) {
        part.startDate = new Date(part.started);
        part.stopDate = new Date(part.stopped);
      }
    }

    /*const myData = [];

    // tslint:disable-next-line:forin
    for (const user in statisticsData) {
      const userParts = statisticsData[user];
      const groupData = [];

      for (const part of userParts) {
        groupData.push({
          label: part.tagDescription,
          data: [
            {
              timeRange: [part.started, part.stopped],
              val: part.description
            }
          ]
        });
      }
      const statisticsGroup: Group = {
        group: user,
        data: groupData
      };

      myData.push(statisticsGroup);
    }

    if (!this.timelineChart) {
      // tslint:disable-next-line:max-line-length
      this.timelineChart = TimelinesChart()(document.getElementById('statistics')).enableOverview(false).timeFormat('%M:%S').data(myData).rightMargin(200).refresh();
    } else {
      this.timelineChart.data(myData).refresh();
    }*/
  }


  public onAudioPlay() {
    this.wavesurfer.play();
  }

  public onAudioPause() {
    this.wavesurfer.pause();
  }

  public onAudioStop() {
    this.wavesurfer.stop();
  }

  private async loadAnalysis() {
    this.analysis = await this.httpClient.get(environment.apiEndpoint + '/analysis').toPromise();

    return this.analysis;
  }

  private async loadAnalysisById(analysisId) {
    this.selectedAnalysis = await this.httpClient.get(environment.apiEndpoint + '/analysis/' + analysisId).toPromise();

    return this.selectedAnalysis;
  }

  private async loadAnalysisStatistics() {
    // tslint:disable-next-line:max-line-length
    this.statistics = await this.httpClient.get(environment.apiEndpoint + '/analysis/' + this.seletedAnalysisSessionID + '/statistics').toPromise();

    return this.statistics;
  }

}
