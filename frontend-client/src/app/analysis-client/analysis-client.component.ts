import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { EditPartDialogComponent } from './edit-part/edit-part.component';
import { Apollo, gql, Mutation } from 'apollo-angular';
import { all } from 'sequelize/types/lib/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import { variable } from '@angular/compiler/src/output/output_ast';
import { OneAnalysisSessionGQL,
        CreatePartWithTagGQL,
        AddPartsToUserGQL,
        AddPartsToSessionGQL,
        SetTagOnPartGQL,
        QueryAllUsersGQL,
        QueryOneUserGQL,
        QueryAllPartsGQL,
        UpdateEditedPartGQL,
        SubmitPartsGQL,
        DeletePartGQL
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
  userParts = []; //
  displayedPartColumns: string[] = ['started', 'stopped', 'tag', 'description', 'edit', 'delete'];
  userID: string;

  constructor(private ngZone: NgZone,
              private readonly httpClient: HttpClient,
              private readonly dialog: MatDialog,
              private readonly apollo: Apollo,
              private _snackBar: MatSnackBar,
              private readonly queryOneAnalysisSessionService: OneAnalysisSessionGQL,
              private readonly createPartService: CreatePartWithTagGQL,
              private readonly addPartsToUserService: AddPartsToUserGQL,
              private readonly addPartsToSessionService: AddPartsToSessionGQL,
              private readonly setTagOnPartService: SetTagOnPartGQL,
              private readonly updateEditedPartService: UpdateEditedPartGQL,
              private readonly queryUsersService: QueryAllUsersGQL,
              private readonly queryOneUserService: QueryOneUserGQL,
              private readonly queryAllPartsService: QueryAllPartsGQL,
              private readonly submitPartsService: SubmitPartsGQL,
              private readonly deletePartService: DeletePartGQL,
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

    //Session verknüpfen
    await this.addPartsToSessionService.mutate({
      sessionId: this.selectedAnalysis.id,
      partIds: [newPart.data.createOnePart.id],
    }).toPromise();

    //Lokal Array userParts mit dem neuen Part updaten
    
    //this.userParts = (this.userParts as any).push(newPart.data.createOnePart);

    this.loadPartsForUser(); //this.userParts = 
//    this.userParts = (await this.queryAllPartsService.fetch({
//      sessionId: this.selectedAnalysisSessionID
//    }).toPromise()).data.analysisSession.parts.filter(this.checkUser.bind(this))
    //console.log(this.userParts);
    // refresh parts area
    //this.ngZone.run(() => {
    //  this.userParts.push(newPart.data.createOnePart);
    //});
    //await this.loadPartsForUser();

    //return this.userParts;
  }

  private checkUser(element) {

    if (element.user && (element.user.id === this.userID)) {
      return element;
    }
  }

  private async refreshNewPartList() {
    console.log(this.userParts)
    this.userParts = (await this.queryAllPartsService.fetch({
      sessionId: this.selectedAnalysisSessionID
    }).toPromise()).data.analysisSession.parts.filter(this.checkUser.bind(this));
    console.log(this.userParts)
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

  public async onSubmitParts() {
    const listOfParts = [];
//    const allPartChanges = [];
    for (const part of this.userParts) {
      listOfParts.push(part.id);
    }

    const updateCount = (await this.submitPartsService.mutate({
      partIds: listOfParts
    }).toPromise()).data.updateManyParts.updatedCount

//    allPartChanges.push(this.httpClient.post(environment.apiEndpoint + '/analysis/' + this.selectedAnalysis.id + '/user', {
//      username: this.username,
//      status: 1
//    }).toPromise());

//    Promise.all(updateCount).then(() => {
//    });
    //User Feedback anzeigen
    const message = updateCount + " Einträge abgeschickt."
    this.openSnackbarStatus(message, "Erledigt");
    
    this.loadAnalysis();
    this.loadPartsForUser();
  }

  private openSnackbarStatus(messageValue: string, action: string){
    this._snackBar.open(messageValue, action, {
      duration: 2000
    });
  }

  public onEdit(part) {
    let dialogRef = this.dialog.open(EditPartDialogComponent, {
      width: '350px',
      data: { tagId: part.tagId, tagDescription: part.tagDescription, description: part.description, tags: this.tags }
    });

    dialogRef.afterClosed().subscribe(async function(result) {
      if (!result.description) {
        result.description = part.description;
      }
      if (!result.tagId) {
        result.tagId = part.tag.id;
      }
      await this.updatePart(part.id, result.description, result.tagId);
      await this.loadPartsForUser();
      this._snackBar.open("Eintrag geändert", "Weiter")
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

  public async onDeletePart(part) {
    const deletePartResponse = (await this.deletePartService.mutate({
      partId: part.id
    }).toPromise()).data.deleteOnePart;

    //Message an User
    const message = "Markierung entfernt";
    this._snackBar.open(message, "Weiter");
    this.loadPartsForUser;
  }

  private async loadPartsForUser() {
    if (this.userID && this.selectedAnalysisSessionID) {
      this.userParts = (await this.queryAllPartsService.fetch({
        sessionId: this.selectedAnalysisSessionID
      }).toPromise()).data.analysisSession.parts.filter(this.checkUser.bind(this));

      return this.userParts;
      // tslint:disable-next-line:max-line-length
      //this.userParts = (await this.httpClient.get(environment.apiEndpoint + '/parts?username=' + this.username + '&analysisId=' + this.seletedAnalysisSessionID).toPromise()) as [];
      //this.userParts = this.loadUserPartsService.fetch().toPromise();
    }
     else {
      this.userParts = [];
    }
  }

  private async loadTags() {
    this.tags = this.selectedAnalysis.tags;
    return this.tags;
  }

  private async updatePart(partid, newdescription, tagId) {
    return (await this.updateEditedPartService.mutate({
      partId: partid,
      tagId: tagId,
      newdescription: newdescription
    }).toPromise()).data.updateOnePart;
    //httpClient.put(environment.apiEndpoint + '/parts/' + part.id, part).toPromise();
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
    if (this.selectedAnalysisSessionID) { //this.userID && 
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



