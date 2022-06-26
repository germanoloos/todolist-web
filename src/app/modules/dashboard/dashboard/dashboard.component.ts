import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

import { ProjectModel } from '@app/core/model/project.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  projects!: ProjectModel[];

  constructor(
    private dashboardService: DashboardService,
  ) {

  }

  ngOnInit(): void {
    this.getAllProjects();
  }

  cardEventEmmiter(event: any): void {
    if (event) {
      this.getAllProjects();
    }
  };

  getAllProjects(): void {
    this.dashboardService.getProjects().subscribe({
      next: (projects: ProjectModel[]) => this.projects = projects,
      error: error => console.error(error)
    });
  }

}
