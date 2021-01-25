import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { EditPartDialogComponent } from '../edit-part/edit-part.component';
import { Apollo, gql, Mutation } from 'apollo-angular';
import { all } from 'sequelize/types/lib/operators';
import { variable } from '@angular/compiler/src/output/output_ast';
import { OneAnalysisSessionGQL, CreatePartWithTagGQL, AddPartsToUserGQL, AddPartsToSessionGQL, SetTagOnPartGQL, QueryAllUsersGQL, QueryOneUserGQL } from 'src/generated/graphql';

@Component({
  selector: 'app-analysis-client',
  templateUrl: './analysis-client.component.html',
  styleUrls: ['./analysis-client.component.css']
})
export class AnalysisClientComponent implements OnInit {
  userList = [];
  username = '';
  currentUser;
  allSessions = [];
  seletedAnalysisSessionID: string;
  selectedAnalysis;
  analysis;
  tags = [];
  userParts = [];
  displayedColumns: string[] = ['started', 'stopped', 'tag', 'description', 'edit'];

  constructor(private ngZone: NgZone,
              private readonly httpClient: HttpClient,
              private readonly dialog: MatDialog,
              private readonly apollo: Apollo,
              private readonly queryOneAnalysisSessionService: OneAnalysisSessionGQL,
              private readonly createPartService: CreatePartWithTagGQL,
              private readonly addPartsToUserService: AddPartsToUserGQL,
              private readonly addPartsToSessionService: AddPartsToSessionGQL,
              private readonly setTagOnPartService: SetTagOnPartGQL,
              //private readonly loadUserPartsService: QueryUserParts,
              private readonly queryUsersService: QueryAllUsersGQL,
              private readonly queryOneUserService: QueryOneUserGQL
              ) { }

  ngOnInit(): void {
    this.loadAvailableAnalysisSessions();
    this.loadAvailableUsers();
  }

  private async loadAvailableUsers() {

  }

  public async markNewPart(tagId?: string) {
    // tslint:disable-next-line:max-line-length
    const startedDate = ( !this.userParts || this.userParts.length === 0 ) ? this.selectedAnalysis.started : this.userParts[this.userParts.length - 1].stopped;

    //Tag feststellen
    const currentTag = tagId;

    //Part auf Server erstellen und mit Tag verknüpfen

    const newPart = await this.createPartService.mutate({
      started: startedDate,
      stopped: new Date().toISOString(),
      description: '',
      submitted: false,
      tagId: tagId
    }).toPromise()
    //Session verknüpfen
    //await this.addPartsToSessionService.mutate({
    //  partIds: [newPart.data.createOnePart.id],
    //  sessionId: this.analysis.id
    //}).toPromise();

    //Lokal Array userParts mit dem neuen Part updaten
    //this.userParts.push(newPartWithTag.data.setTagOnPart);

    // refresh parts area
    this.ngZone.run(() => {
      this.userParts.push(newPart.data.createOnePart);
    });
    this.loadPartsForUser();
    //return this.userParts;
  }

  private async loadNewPart() {
    this.userParts = await (await QueryAllUserPartsGQL.fetch().toPromise()).data.analysisSessions;
    return this.userParts;
  }

  public onSessionSelected() {
    this.loadAnalysis();
    this.loadPartsForUser();
  }

  public async onUsernameChanged() {
    this.loadAnalysis();
    this.loadPartsForUser();
  }

  public onSubmitParts() {
    const allPartChanges = [];
    for (const part of this.userParts) {
      allPartChanges.push(this.httpClient.put(environment.apiEndpoint + '/parts/' + part.id, {
        submitted: true
      }).toPromise());
    }

    allPartChanges.push(this.httpClient.post(environment.apiEndpoint + '/analysis/' + this.selectedAnalysis.id + '/user', {
      username: this.username,
      status: 1
    }).toPromise());

    Promise.all(allPartChanges).then(() => {
      this.loadAnalysis();
      this.loadPartsForUser();
    });
  }

  public onEdit(part) {
    const dialogRef = this.dialog.open(EditPartDialogComponent, {
      width: '250px',
      data: { tagId: part.tagId, tagDescription: part.tagDescription, description: part.description, tags: this.tags }
    });

    dialogRef.afterClosed().subscribe(async function(result) {
      part.description = result.description;
      part.tagId = result.tagId;

      await this.updatePart(part);
      await this.loadPartsForUser();
    }.bind(this));
  }

  private async loadAvailableAnalysisSessions() {
    const QUERY_All = gql(`query {analysisSessions {id name}}`);
    const allSessionsObject = await this.apollo.query({
      query: QUERY_All
    }).toPromise();
    this.allSessions = (allSessionsObject.data as any).analysisSessions;
    //this.analysis = await this.httpClient.get(environment.apiEndpoint + '/analysis').toPromise();
  }

  private async loadPartsForUser() {
    if (this.username && this.seletedAnalysisSessionID) {
      // tslint:disable-next-line:max-line-length
      //this.userParts = (await this.httpClient.get(environment.apiEndpoint + '/parts?username=' + this.username + '&analysisId=' + this.seletedAnalysisSessionID).toPromise()) as [];
      //this.userParts = this.loadUserPartsService.fetch().toPromise();
    } else {
      this.userParts = [];
    }
    return this.userParts;
  }

  private async loadTags() {
    this.tags = this.selectedAnalysis.tags;
    return this.tags;
  }

  private updatePart(part) {
    return this.httpClient.put(environment.apiEndpoint + '/parts/' + part.id, part).toPromise();
  }

  private async loadAnalysis() {
    if (this.username && this.seletedAnalysisSessionID) {
      // tslint:disable-next-line:max-line-length
      const loadedAnalysisSessionResponse = await this.queryOneAnalysisSessionService.fetch({
        analysisSessionId: this.seletedAnalysisSessionID
      }).toPromise();
      this.selectedAnalysis = loadedAnalysisSessionResponse.data.analysisSession;
      this.loadTags();
      return this.selectedAnalysis;
    } else {
      this.selectedAnalysis = null;
    }
  }
}



