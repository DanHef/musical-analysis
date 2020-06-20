import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalysisClientComponent } from './analysis-client/analysis-client.component';
import { NavigationComponent } from './navigation/navigation.component';


const routes: Routes = [
  { path: 'analysis-client', component: AnalysisClientComponent },
  { path: 'main', component: NavigationComponent },
  { path: '', redirectTo: 'main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
