import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from 'src/app/app-material';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { SharedModule } from '@app/core/shared.module';


@NgModule({
  declarations: [
    DashboardComponent,
    NewProjectComponent,
    ProjectCardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AngularMaterialModule,
    HttpClientModule,
    SharedModule
  ]
})
export class DashboardModule { }
