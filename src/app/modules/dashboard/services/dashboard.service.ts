import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectModel } from '@app/core/model/project.model';
import { TaskModel } from '@app/core/model/task.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient: HttpClient) { }

  //Project
  getProjects(): Observable<ProjectModel[]> {
    return this.httpClient.get<ProjectModel[]>(`${environment.API_URL}/projects`);
  }

  newProject(project: ProjectModel): Observable<ProjectModel> {
    return this.httpClient.post<ProjectModel>(`${environment.API_URL}/projects`, project);
  }

  updateProjet(project: ProjectModel): Observable<ProjectModel> {
    return this.httpClient.put<ProjectModel>(`${environment.API_URL}/projects/${project.id}`, project);
  }

  deleteProject(id: number): Observable<any>{
    return this.httpClient.delete(`${environment.API_URL}/projects/${id}`);
  }

  // Task
  addTask(projectId: number, task: TaskModel): Observable<any>{
    return this.httpClient.post(`${environment.API_URL}/task/${projectId}`, task);
  }

  updateTask(task: TaskModel): Observable<any>{
    return this.httpClient.put(`${environment.API_URL}/task/${task.id}`, task);
  }

  deleteTask(task: TaskModel): Observable<any>{
    return this.httpClient.delete(`${environment.API_URL}/task/${task.id}`);
  }
}
