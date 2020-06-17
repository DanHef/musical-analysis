import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-analysis-client',
  templateUrl: './analysis-client.component.html',
  styleUrls: ['./analysis-client.component.css']
})
export class AnalysisClientComponent implements OnInit {
  username = '';
  seletedAnalysisSessionID: string;
  analysis;
  userParts;
  displayedColumns: string[] = ['started', 'stopped', 'description'];

  constructor(private readonly httpClient: HttpClient) { }

  ngOnInit(): void {
    this.loadAvailableAnalysisSessions();
  }

  public async markNewPart() {
    const newPart = await this.httpClient.post(environment.apiEndpoint + '/parts', {
      started: new Date().toISOString(),
      stopped: null,
      username: this.username,
      analysisId: this.seletedAnalysisSessionID,
      description: '',
      tagId: null
    }).toPromise();

    // refresh parts area
    this.loadPartsForUser();
  }

  public onSessionSelected() {
    this.loadPartsForUser();
  }

  private async loadAvailableAnalysisSessions() {
    this.analysis = await this.httpClient.get(environment.apiEndpoint + '/analysis').toPromise();
  }

  private async loadPartsForUser() {
    // tslint:disable-next-line:max-line-length
    this.userParts = await this.httpClient.get(environment.apiEndpoint + '/parts?username=' + this.username + '&analysisId=' + this.seletedAnalysisSessionID ).toPromise();
  }

}
