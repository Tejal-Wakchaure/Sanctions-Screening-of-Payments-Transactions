import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { UploadComponent } from './modules/upload/upload.component';
import { TeamComponent } from './modules/team/team.component';
import { SanctionComponent } from './modules/sanction/sanction.component';
import { AboutComponent } from './modules/about/about.component';
import { DialogRef } from '@angular/cdk/dialog';
import { DiaplayFileComponent } from './modules/diaplay-file/diaplay-file.component';
import { ValidateFileComponent } from './modules/validate-file/validate-file.component';
const routes: Routes = [{
  path : '',
  component : DefaultComponent ,
  children : [{
    path : 'Upload',
    component : UploadComponent
  },
  {
    path : 'Team',
    component: TeamComponent
  },
  {
    path:'About',
    component : AboutComponent
  },
  {
    path:'Display',
    component : DiaplayFileComponent
  }
,
  {
    path:'Validate',
    component : ValidateFileComponent
  }
  
]

}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
