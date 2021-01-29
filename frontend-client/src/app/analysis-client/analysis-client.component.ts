import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { EditPartDialogComponent } from '../edit-part/edit-part.component';
import { Apollo, gql, Mutation } from 'apollo-angular';
import { all } from 'sequelize/types/lib/operators';
import { variable } from '@angular/compiler/src/output/output_ast';
import { OneAnalysisSessionGQL,
        CreatePartWithTagGQL,
        AddPartsToUserGQL,
        AddPartsToSessionGQL,
        SetTagOnPartGQL,
        QueryAllUsersGQL,
        QueryOneUserGQL,
        QueryAllPartsGQL,
         } from 'src/generated/graphql';

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
  allUsers = [];
  selectedUser;
  selectedAnalysisSessionID: string;
  selectedAnalysis;
  analysisSession;
  tags = [];
  userParts = [];
  displayedColumns: string[] = ['started', 'stopped', 'tag', 'description', 'edit'];
  userID: string;

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
              private readonly queryOneUserService: QueryOneUserGQL,
              private readonly queryAllPartsService: QueryAllPartsGQL
              ) { }

  ngOnInit(): void {
    this.loadAvailableAnalysisSessions();
    this.loadAvailableUsers();
  }

  private async loadAvailableUsers() {
    const QUERY_All_USERS = gql(`query {users {id username}}`);
    const allUsers = await this.apollo.query({
      query: QUERY_All_USERS
    }).toPromise();
    this.allUsers = (allUsers.data as any).users;
  }

  public onUsernameSelected() {
    this.loadUser();
    this.loadPartsForUser();
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

    // User verknüpfen
    const userResponse = await this.addPartsToUserService.mutate({
      userId: this.selectedUser.id,
      partIds: [newPart.data.createOnePart.id]
    }).toPromise();
    console.log(userResponse);
    //Session verknüpfen
    await this.addPartsToSessionService.mutate({
      sessionId: this.selectedAnalysis.id,
      partIds: [newPart.data.createOnePart.id],
    }).toPromise();

    //Lokal Array userParts mit dem neuen Part updaten
    //this.userParts.push(newPartWithTag.data.setTagOnPart);

    // refresh parts area
    this.ngZone.run(() => {
      this.userParts.push(newPart.data.createOnePart);
    });
    await this.loadPartsForUser();
    //return this.userParts;
  }

  private async loadNewPartList() {
    this.userParts = await (await this.queryAllPartsService.fetch().toPromise()).data.analysisSession.parts;
    return this.userParts;
  }

  public onSessionSelected() {
    this.loadAnalysis();
    this.loadPartsForUser();
  }

  public async onUsernameChanged() {
    this.loadUser();
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
    if (this.username && this.selectedAnalysisSessionID) {
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

  private async loadUser() {   
    //kompletten Benutzer laden
    const loadedUserResponse = await this.queryOneUserService.fetch({
      userId: this.userID
    }).toPromise();
    this.selectedUser = loadedUserResponse.data.user;
    return this.selectedUser;
  }

  private async loadAnalysis() {
    if (this.userID && this.selectedAnalysisSessionID) {
      // tslint:disable-next-line:max-line-length
      const loadedAnalysisSessionResponse = await this.queryOneAnalysisSessionService.fetch({
        analysisSessionId: this.selectedAnalysisSessionID
      }).toPromise();
      this.selectedAnalysis = loadedAnalysisSessionResponse.data.analysisSession;
      this.loadTags();
      return this.selectedAnalysis;
    } else {
      this.selectedAnalysis = null;
    }
  }
}



