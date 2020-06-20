import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalysisMasterComponent } from './analysis-master/analysis-master.component';
import { NavigationComponent } from './navigation/navigation.component';


const routes: Routes = [
  { path: 'analysis-master', component: AnalysisMasterComponent },
  { path: 'main', component: NavigationComponent },
  { path: '', redirectTo: 'main', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
