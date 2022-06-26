import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ProjectModel } from '@app/core/model/project.model';
import { TaskModel } from '@app/core/model/task.model';
import { DialogService } from '@app/core/services/dialog.service';
import { DashboardService } from '../../services/dashboard.service';
import * as moment from 'moment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  @Input() project!: ProjectModel;
  @Output() deleteRequest = new EventEmitter<any>();
  taskForm!: FormGroup;

  constructor(
    private dashboardService: DashboardService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      description: [null, Validators.required]
    });
  }

  deleteProject(id: number): void {
    const confirmation = this.dialogService.confirmation("Do you realy want delete this project?");
    confirmation.afterClosed().subscribe((ok) => {
      if (ok) {
        this.dashboardService.deleteProject(id).subscribe(() => {
          this.deleteRequest.emit(ok);
        }, error => console.error(error));
      }
    })
  }

  onSubmit(formDirective: FormGroupDirective): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return
    }
    const task = this.taskForm.value;
    this.dashboardService.addTask(this.project.id, this.taskForm.value).subscribe((resp: any) => {
      this.project.tasks.push({ ...resp, ...task })
      console.log(resp);
      this.taskForm.reset();
      formDirective.resetForm()
    })
  }

  getTodoItems(items: TaskModel[]): TaskModel[] {
    return items.filter((item) => !item.done);
  }

  getDoneItems(items: TaskModel[]): TaskModel[] {
    return items.filter((item: TaskModel) => item.done);
  }

  checkItem(taskId: number, event: any): void {
    this.project.tasks.map(async task => {
      if (task.id === taskId) {
        task.done = event.checked;
        task = await this.updateTask(task).toPromise();
        console.log(task)
      }
    });
  }

  updateTask(task: TaskModel): Observable<any> {
    return this.dashboardService.updateTask(task);
  }

  getTooltip(task: TaskModel): string {
    let tooltip = `Created at: `;
    tooltip += moment(task.createdAt).format('DD/MM/yyyy HH:mm:ss');
    if (task.finishedAt) {
      tooltip += ` Finished at: `;
      tooltip += moment(task.finishedAt).format('DD/MM/yyyy HH:mm:ss');
    }
    return tooltip;
  }

}
