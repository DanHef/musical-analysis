import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalysisMasterComponent } from './analysis-master/analysis-master.component';
import { AnalysisClientComponent } from './analysis-client/analysis-client.component';
import { NavigationComponent } from './navigation/navigation.component';


const routes: Routes = [
  { path: 'analysis-master', component: AnalysisMasterComponent },
  { path: 'analysis-client', component: AnalysisClientComponent },
  { path: 'main', component: NavigationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
