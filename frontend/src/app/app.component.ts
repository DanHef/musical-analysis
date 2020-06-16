import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import WaveSurfer from 'wavesurfer.js';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'musical-analysis-frontend';
  analysisSessionID = '';
  wavesurfer;

  constructor(private readonly httpClient: HttpClient) { }

  public ngOnInit() {
    this.wavesurfer = WaveSurfer.create({
      container: '#wavesurfer'
    });

    this.wavesurfer.load('http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3');
  }

  public createAnalysisSession() {
    this.httpClient.post(environment.apiEndpoint + '/analysis', {
      id: this.analysisSessionID
    }).subscribe(() => {
      console.log('hello');
    });
  }

  public async startMusic() {
    await this.httpClient.put(environment.apiEndpoint + '/analysis/' + this.analysisSessionID, {
      started: new Date().toISOString()
    }).subscribe(() => {
      console.log('hello');
    });

    this.wavesurfer.play();
  }

  public async stopMusic() {
    await this.httpClient.put(environment.apiEndpoint + '/analysis/' + this.analysisSessionID, {
      stopped: new Date().toISOString()
    }).subscribe(() => {
      console.log('hello');
    });

    this.wavesurfer.stop();
  }
}
