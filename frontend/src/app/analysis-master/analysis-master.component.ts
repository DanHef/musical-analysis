import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import WaveSurfer from 'wavesurfer.js';
import { environment } from '../../environments/environment';

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

  constructor(private readonly httpClient: HttpClient) { }

  public ngOnInit() {
    this.wavesurfer = WaveSurfer.create({
      container: '#wavesurfer'
    });

    this.wavesurfer.load('http://musical-analysis.moderator.heffter.net/audio/Strophen-Holz.mp3');

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
