import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SurveyComponent } from './pages/survey/survey.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'survey', component: SurveyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
