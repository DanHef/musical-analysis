import { Component, NgZone, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import WaveSurfer from 'wavesurfer.js';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js';
import RegionPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.js';
import { environment } from '../../environments/environment';
import TimelinesChart, { Group } from 'timelines-chart';
import { Apollo, gql, Mutation } from 'apollo-angular';
import { map } from "rxjs/operators";
import { AllAnalysisSessionsGQL, AllTagsGQL, AnalysisSessionTagsGQL, OneAnalysisSessionGQL, RemoveTagFromSessionGQL, QueryOneTagGQL } from 'src/generated/graphql';
import { privateEncrypt } from 'crypto';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TagDialog } from "./tag-dialog.component";

interface AnalysisSessionsResponse {
    analysisSessions: Array<any>
}

interface AnalysisSessionResponse {
    analysisSession: any
}

interface CreateTagResponse {
    createOneTag: any
}

interface CreateAnalysisSessionResponse {
    createOneAnalysisSession: any
}

interface AddAnalysisSessionTagResponse {
    addAnalysisSessionTag: any
}

export interface TagData {
    newTagName: '';
    newTagDescription: '';
}

const MUTATION_DELETE_ONE_ANALYSIS_SESSION = gql(`mutation ($analysisSessionId: ID!){
    deleteOneAnalysisSession(input: {
        id: $analysisSessionId
    }){id}
}`);

const MUTATION_UPDATE_ONE_ANALYSIS_SESSION_START = gql(`mutation ($analysisSessionId: ID!, $timeStamp: DateTime) {
    updateOneAnalysisSession(input: {
        id: $analysisSessionId,
        update: {started: $timeStamp}
    }){started}
}`);

const MUTATION_UPDATE_ONE_ANALYSIS_SESSION_STOP = gql(`mutation ($analysisSessionId: ID!, $timeStamp: DateTime) {
    updateOneAnalysisSession(input: {
        id: $analysisSessionId,
        update: {stopped: $timeStamp}
    }){stopped}
}`);

const MUTATION_UPLOAD = gql(`mutation ($analysisSessionId: ID!, $file: Upload!) {
    uploadFile(input: {
        id: $analysisSessionId,
        file: $timeStamp
    }){id}
}`);

@Component({
    selector: 'app-analysis-master',
    templateUrl: './analysis-master.component.html',
    styleUrls: ['./analysis-master.component.css']
})
export class AnalysisMasterComponent implements OnInit {
    analysisSessionID = '';
    currentAnalysisSession;
    wavesurfer;
    analysis;
    statistics;
    displayedColumns: string[] = ['id', 'started', 'stopped', 'delete'];
    displayedTagsColumns: string[] = ['id', 'name', 'description', 'delete']
    timelineChart;
    statisticsData;
    sessionDurationInSeconds;
    tags;
    newTagName = '';
    newTagDescription = '';
    selectedTag;
    sessionTags;
    tagDescription

    constructor(private readonly httpClient: HttpClient,
                private readonly apollo: Apollo,
                private readonly queryAllAnalysisSessionsService: AllAnalysisSessionsGQL,
                private readonly queryAllTagsService: AllTagsGQL,
                private readonly queryAllAnalysisSessionTagsService: AnalysisSessionTagsGQL,
                private readonly queryOneAnalysisSessionService: OneAnalysisSessionGQL,
                private readonly removeOneTagFromSessionService: RemoveTagFromSessionGQL,
                private readonly queryOneTagService: QueryOneTagGQL,
                private readonly zone: NgZone,
                private tagDialog: MatDialog) { }

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
        this.loadTags();
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
                    query: this.queryAllAnalysisSessionsService.document
                });
                const newAnalysisSession = data["createOneAnalysisSession"];
                const sessions = [...existingAnalysisSessions.analysisSessions, newAnalysisSession];
                cache.writeQuery({
                    query: this.queryAllAnalysisSessionsService.document,
                    data: { analysisSessions: sessions }
                });
            },
        }).pipe(map(result => result.data && (result.data as CreateAnalysisSessionResponse).createOneAnalysisSession)).toPromise();

        await this.loadAnalysis();
        this.setcurrentAnalysisSession(newAnalysisSession);
    }

    public async createTag() {
        const newTag = await this.apollo.mutate({
            mutation: gql(`
            mutation{
                createOneTag(input: {
                    tag: {
                        name: "${this.newTagName}"
                        description: "${this.newTagDescription}"
                    }
                })
                {
                    id
                    name
                    description
                }}`
            ),
            update: (cache, { data }) => {
                const existingTags: any = cache.readQuery({
                    query: this.queryAllTagsService.document
                });
                const newTag = data["createOneTag"];
                const alltags = [...existingTags.tags, newTag];
                cache.writeQuery({
                    query: this.queryAllTagsService.document,
                    data: { tags: alltags }
                });
            },
        }).pipe(map(result => result.data && (result.data as CreateTagResponse).createOneTag)).toPromise();
        
        this.selectedTag = newTag;
        await this.loadTags();
        this.addTagToAnalysisSession();
    }

    public async addTagToAnalysisSession() {
        const mutatedSession = await this.apollo.mutate({
            mutation: gql(`
            mutation {
                addTagsToAnalysisSession(input: {
                  id: "${this.currentAnalysisSession.id}",
                  relationIds: "${this.selectedTag.id}"
                })
                {id name started stopped tags {id name}}
              }`
            ),
            update: (cache, { data }) => {
                const existingSessionTags: any = cache.readQuery({
                    query: this.queryAllAnalysisSessionTagsService.document
                });
                const newSessionTags = data["addTagsToAnalysisSession"];
                cache.writeQuery({
                    query: this.queryAllAnalysisSessionTagsService.document,
                    data: { analysisSession: newSessionTags }
                });
            },
        }).pipe(map(result => result.data && (result.data as AddAnalysisSessionTagResponse).addAnalysisSessionTag)).toPromise();
        
        await this.loadTags();
        this.loadAnalysisSessionTags();
    }


    public async startMusic() {
        const startMusic = await this.apollo.mutate({
            mutation: MUTATION_UPDATE_ONE_ANALYSIS_SESSION_START,
            variables: {
                analysisSessionId: this.currentAnalysisSession.id,
                timeStamp: new Date().toISOString()
            },
            update: (cache, { data }) => {
                const existingAnalysisSessions: any = cache.readQuery({
                    query: this.queryAllAnalysisSessionsService.document
                });

                const sessions = existingAnalysisSessions.analysisSessions.map(session => {
                    if(session.id === this.currentAnalysisSession.id) {
                        return {...session, started: data["updateOneAnalysisSession"].started}
                    } else {
                        return session;
                    }
                })

                cache.writeQuery({
                    query: this.queryAllAnalysisSessionsService.document,
                    data: { analysisSessions: sessions }
                });
            },
        }).pipe(map(result => result.data && (result.data as CreateAnalysisSessionResponse).createOneAnalysisSession)).toPromise();


        this.loadAnalysis();
        this.loadAnalysisById(this.currentAnalysisSession.id);

        this.wavesurfer.play();
    }

    public async stopMusic() {
        //await this.httpClient.put(environment.apiEndpoint + '/analysis/' + this.currentAnalysisSession.id, {
        //    stopped: new Date().toISOString()
        //}).toPromise();
        const stopMusic = await this.apollo.mutate({
            mutation: MUTATION_UPDATE_ONE_ANALYSIS_SESSION_STOP,
            variables: {
                analysisSessionId: this.currentAnalysisSession.id,
                timeStamp: new Date().toISOString()
            },
            update: (cache, { data }) => {
                const existingAnalysisSessions: any = cache.readQuery({
                    query: this.queryAllAnalysisSessionsService.document
                });

                const sessions = existingAnalysisSessions.analysisSessions.map(session => {
                    if(session.id === this.currentAnalysisSession.id) {
                        return {...session, stopped: data["updateOneAnalysisSession"].stopped}
                    } else {
                        return session;
                    }
                })

                cache.writeQuery({
                    query: this.queryAllAnalysisSessionsService.document,
                    data: { analysisSessions: sessions }
                });
            },
        }).pipe(map(result => result.data && (result.data as CreateAnalysisSessionResponse).createOneAnalysisSession)).toPromise();



        this.loadAnalysis();
        this.loadAnalysisById(this.currentAnalysisSession.id);

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
                    query: this.queryAllAnalysisSessionsService.document
                });

                const sessions = existingAnalysisSessions.analysisSessions.filter((session) => {
                    return session.id !== analysis.id;
                });

                cache.writeQuery({
                    query: this.queryAllAnalysisSessionsService.document,
                    data: { analysisSessions: sessions }
                });
            },
        }).pipe(map(result => result.data && (result.data as CreateAnalysisSessionResponse).createOneAnalysisSession)).toPromise();
        await this.loadAnalysis();
    }

    public async onTagDelete(tag) {
        await this.apollo.mutate({
            mutation: gql(`
            mutation {
                removeTagsFromAnalysisSession(input: {
                  id: "${this.currentAnalysisSession.id}",
                  relationIds: "${tag.id}"
                })
                {id name started stopped tags {id name}}
              }`
            ),
        }).toPromise();
        await this.loadAnalysis();
        await this.loadAnalysisSessionTags();
    }

    public onSessionSelected(event) {
        if(event.isUserInput) {
            this.loadAnalysisById(event.source.value);
        }
    }

    public async onTagSelected(event) {
        const loadedTagResponse = await this.queryOneTagService.fetch({
            tagId: event.source.value
        }).toPromise();
        this.selectedTag = loadedTagResponse.data.tag
        return this.selectedTag
    }

    public async uploadFile($event) {
        let currentId = this.currentAnalysisSession.id;
        this.apollo.mutate(
            {
                mutation: MUTATION_UPLOAD,
                variables: {
                  analysisSessionID: currentId,
                  file: $event.target.files[0]
                },
            
                context: {
                  useMultipart: true
                }
            }).toPromise();
    }
    
    public async onStatisticsRefresh() {
        this.statisticsData = await this.loadAnalysisStatistics();
        this.loadAnalysisById(this.currentAnalysisSession.id);

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
        this.analysis = await (await this.queryAllAnalysisSessionsService.fetch().toPromise()).data.analysisSessions;
        return this.analysis;
    }
    
    private async loadTags() {
        this.tags = await (await this.queryAllTagsService.fetch().toPromise()).data.tags;
        return this.tags;
    }

    private async loadAnalysisById(analysisId) {
        const loadedAnalysisSessionResponse = await this.queryOneAnalysisSessionService.fetch({
            analysisSessionId: analysisId
        }).toPromise();

        const loadedAnalysisSession = loadedAnalysisSessionResponse.data.analysisSession;
        
        this.setcurrentAnalysisSession(loadedAnalysisSession);
        //const sessionTags = this.loadAnalysisSessionTags();
        return loadedAnalysisSession;
    }

    private setcurrentAnalysisSession(analysisSession) {
        this.currentAnalysisSession = analysisSession;
        this.sessionTags = analysisSession.tags
    }

    private async loadAnalysisStatistics() {
        // tslint:disable-next-line:max-line-length
        this.statistics = await this.httpClient.get(environment.apiEndpoint + '/analysis/' + this.currentAnalysisSession.id + '/statistics').toPromise();

        return this.statistics;
    }
    
    private async loadAnalysisSessionTags() {
        this.sessionTags = await (await this.queryAllAnalysisSessionTagsService.fetch().toPromise()).data.analysisSession.tags;
        return this.sessionTags;
    }

    public openTagDialog() {
        const dialogRef = this.tagDialog.open(TagDialog, {
            width: '300px',
            data: { newTagName: '', newTagDescription: ''}
        });
        dialogRef.afterClosed().subscribe(result => {
            this.newTagName = result.newTagName;
            this.newTagDescription = result.newTagDescription;
            this.createTag();
        });
    }
}