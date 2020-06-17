import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-analysis-client',
  templateUrl: './analysis-client.component.html',
  styleUrls: ['./analysis-client.component.css']
})
export class AnalysisClientComponent implements OnInit {
  seletedAnalysisSessionID: string;
  analysis;

  constructor(private readonly httpClient: HttpClient) { }

  ngOnInit(): void {
    this.loadAvailableAnalysisSessions();
  }

  private async loadAvailableAnalysisSessions() {
    this.analysis = await this.httpClient.get(environment.apiEndpoint + '/analysis').toPromise();
  }

}
