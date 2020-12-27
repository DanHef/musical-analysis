import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import WaveSurfer from 'wavesurfer.js';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js';
import RegionPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.js';
import { environment } from '../../environments/environment';
import TimelinesChart, { Group } from 'timelines-chart';
import { Apollo, gql } from 'apollo-angular';
import { map } from "rxjs/operators";

interface AnalysisSessionsResponse {
    analysisSessions: Array<any>
}

interface AnalysisSessionResponse {
    analysisSession: any
}

interface CreateAnalysisSessionResponse {
    createOneAnalysisSession: any
}

const QUERY_ALL_ANALYSIS_SESSIONS = gql(`{
    analysisSessions{
            id
            name
            started 
            stopped
      }
}`);

const QUERY_ONE_ANALYSIS_SESSION = gql(`query oneSession($analysisSessionId: ID!){
    analysisSession(id: $analysisSessionId){id name started stopped}
}`);

const MUTATION_DELETE_ONE_ANALYSIS_SESSION = gql(`mutation ($analysisSessionId: ID!){
    deleteOneAnalysisSession(input: {
        id: $analysisSessionId
    }){id}
}`);

@Component({
    selector: 'app-analysis-master',
    templateUrl: './analysis-master.component.html',
    styleUrls: ['./analysis-master.component.css']
})
export class AnalysisMasterComponent implements OnInit {
    analysisSessionID = '';
    selectedAnalysisSession;
    wavesurfer;
    analysis;
    statistics;
    displayedColumns: string[] = ['id', 'started', 'stopped', 'delete'];
    timelineChart;
    statisticsData;
    sessionDurationInSeconds;

    constructor(private readonly httpClient: HttpClient,
        private readonly apollo: Apollo) { }

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

    public async createAnalysisSession() {
        const newAnalysisSession = await this.apollo.mutate({
            mutation: gql(`mutation{
                createOneAnalysisSession(input:{
                    analysisSession:{
                        name:"${this.analysisSessionID}"
                    }
                })
                {id name started stopped}
            }`),
            update: (cache, { data }) => {
                const existingAnalysisSessions: any = cache.readQuery({
                    query: QUERY_ALL_ANALYSIS_SESSIONS
                });
                const newAnalysisSession = data["createOneAnalysisSession"];
                const sessions = [...existingAnalysisSessions.analysisSessions, newAnalysisSession];
                cache.writeQuery({
                    query: QUERY_ALL_ANALYSIS_SESSIONS,
                    data: { analysisSessions: sessions }
                });
            },
        }).pipe(map(result => result.data && (result.data as CreateAnalysisSessionResponse).createOneAnalysisSession)).toPromise();

        await this.loadAnalysis();
        this.setSelectedAnalysisSession(newAnalysisSession);
    }

    public async startMusic() {
        await this.httpClient.put(environment.apiEndpoint + '/analysis/' + this.selectedAnalysisSession.id, {
            started: new Date().toISOString()
        }).toPromise();

        this.loadAnalysis();
        this.loadAnalysisById(this.selectedAnalysisSession.id);

        this.wavesurfer.play();
    }

    public async stopMusic() {
        await this.httpClient.put(environment.apiEndpoint + '/analysis/' + this.selectedAnalysisSession.id, {
            stopped: new Date().toISOString()
        }).toPromise();

        this.loadAnalysis();
        this.loadAnalysisById(this.selectedAnalysisSession.id);

        this.wavesurfer.stop();
    }

    public async onDelete(analysis) {
        await this.apollo.mutate({
            mutation: MUTATION_DELETE_ONE_ANALYSIS_SESSION,
            variables: {
                analysisSessionId: analysis.id
            },
            update: (cache, { data }) => {
                const existingAnalysisSessions: any = cache.readQuery({
                    query: QUERY_ALL_ANALYSIS_SESSIONS
                });

                const sessions = existingAnalysisSessions.analysisSessions.filter((session) => {
                    return session.id !== analysis.id;
                });

                cache.writeQuery({
                    query: QUERY_ALL_ANALYSIS_SESSIONS,
                    data: { analysisSessions: sessions }
                });
            },
        }).pipe(map(result => result.data && (result.data as CreateAnalysisSessionResponse).createOneAnalysisSession)).toPromise();
        //await this.httpClient.delete(environment.apiEndpoint + '/analysis/' + analysis.id).toPromise();
        await this.loadAnalysis();
    }

    public onSessionSelected(event) {
        this.loadAnalysisById(event.source.value);
    }

    public async onStatisticsRefresh() {
        this.statisticsData = await this.loadAnalysisStatistics();
        this.loadAnalysisById(this.selectedAnalysisSession.id);

        // tslint:disable-next-line:forin
        for (const user in this.statisticsData) {
            const userParts = this.statisticsData[user].partData;

            for (const part of userParts) {
                part.startDate = new Date(part.started);
                part.stopDate = new Date(part.stopped);
            }
        }
    }

    getMarginForUserStatistic(username) {
        let largestHeight = 0;
        // tslint:disable-next-line:max-line-length
        const children = document.getElementById('statistics_user_' + username) ? document.getElementById('statistics_user_' + username).children : null;

        if (children) {
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < children.length; i++) {
                const child: any = children[i];
                if (child.nodeName === 'SPAN') {
                    console.log(child.children[0].offsetHeight);
                    if (largestHeight < child.children[0].offsetHeight) {
                        largestHeight = child.children[0].offsetHeight;
                    }
                }
            }

            return largestHeight + 15;
        } else {
            return 25;
        }
    }

    getTopForPart(partId?) {
        const elementHeight = document.getElementById(partId) ? document.getElementById(partId).offsetHeight : 0;

        return elementHeight * -1;
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
        this.analysis = await this.apollo.query({
            query: QUERY_ALL_ANALYSIS_SESSIONS
        })
            .pipe(map(({ data }) => (data as AnalysisSessionsResponse).analysisSessions)).toPromise();

        return this.analysis;
    }

    private async loadAnalysisById(analysisId) {
        const loadedAnalysisSession = await this.apollo.query({
            query: QUERY_ONE_ANALYSIS_SESSION,
            variables: {
                analysisSessionId: analysisId
            }
        }).pipe(map(result => result.data && (result.data as AnalysisSessionResponse).analysisSession)).toPromise();

        this.setSelectedAnalysisSession(loadedAnalysisSession);
        return loadedAnalysisSession;
    }

    private setSelectedAnalysisSession(analysisSession) {
        this.selectedAnalysisSession = analysisSession;
    }

    private async loadAnalysisStatistics() {
        // tslint:disable-next-line:max-line-length
        this.statistics = await this.httpClient.get(environment.apiEndpoint + '/analysis/' + this.selectedAnalysisSession.id + '/statistics').toPromise();

        return this.statistics;
    }

}
