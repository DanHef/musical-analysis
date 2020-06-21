import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { EditPartDialogComponent } from '../edit-part/edit-part.component';

@Component({
  selector: 'app-analysis-client',
  templateUrl: './analysis-client.component.html',
  styleUrls: ['./analysis-client.component.css']
})
export class AnalysisClientComponent implements OnInit {
  username = '';
  seletedAnalysisSessionID: string;
  selectedAnalysis;
  analysis;
  tags = [];
  userParts = [];
  displayedColumns: string[] = ['started', 'stopped', 'tag', 'description', 'edit'];

  constructor(private readonly httpClient: HttpClient, private readonly dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadAvailableAnalysisSessions();
    this.loadTags();
  }

  public async markNewPart(tagId?: string) {
    // tslint:disable-next-line:max-line-length
    const startedDate = ( !this.userParts || this.userParts.length === 0 ) ? this.selectedAnalysis.started : this.userParts[this.userParts.length - 1].stopped;

    const newPart = await this.httpClient.post(environment.apiEndpoint + '/parts', {
      started: startedDate,
      stopped: new Date().toISOString(),
      username: this.username,
      analysisId: this.seletedAnalysisSessionID,
      description: '',
      tagId
    }).toPromise();

    // refresh parts area
    this.loadPartsForUser();
  }

  public onSessionSelected() {
    this.loadAnalysis();
    this.loadPartsForUser();
  }

  public onUsernameChanged() {
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
    this.analysis = await this.httpClient.get(environment.apiEndpoint + '/analysis').toPromise();
  }

  private async loadPartsForUser() {
    if (this.username && this.seletedAnalysisSessionID) {
      // tslint:disable-next-line:max-line-length
      this.userParts = (await this.httpClient.get(environment.apiEndpoint + '/parts?username=' + this.username + '&analysisId=' + this.seletedAnalysisSessionID).toPromise()) as [];
    } else {
      this.userParts = null;
    }
  }

  private async loadTags() {
    this.tags = await this.httpClient.get(environment.apiEndpoint + '/tags').toPromise() as Array<{}>;

    return this.tags;
  }

  private updatePart(part) {
    return this.httpClient.put(environment.apiEndpoint + '/parts/' + part.id, part).toPromise();
  }

  private async loadAnalysis() {
    if (this.username && this.seletedAnalysisSessionID) {
      // tslint:disable-next-line:max-line-length
      this.selectedAnalysis = await this.httpClient.get(environment.apiEndpoint + '/analysis/' + this.seletedAnalysisSessionID + '/user/' + this.username).toPromise();

      return this.selectedAnalysis;
    } else {
      this.selectedAnalysis = null;
    }
  }
}



