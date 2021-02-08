import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';



import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MdePopoverModule } from '@material-extended/mde';

import { AnalysisMasterComponent } from './analysis-master/analysis-master.component';
import { NavigationComponent } from './navigation/navigation.component';
import { GraphQLModule } from './graphql.module';

import { TagDialog } from './analysis-master/tag-dialog.component'

import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from "angular-plotly.js";

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    AnalysisMasterComponent,
    NavigationComponent,
    TagDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    MdePopoverModule,
    GraphQLModule,
    PlotlyModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
