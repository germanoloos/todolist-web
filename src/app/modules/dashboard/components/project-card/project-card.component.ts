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
  showEditDelete = -1;

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

  getTooltip(task: TaskModel): string {
    let tooltip = `Created at: `;
    tooltip += moment(task.createdAt).format('DD/MM/yyyy HH:mm:ss');
    if (task.finishedAt) {
      tooltip += ` Finished at: `;
      tooltip += moment(task.finishedAt).format('DD/MM/yyyy HH:mm:ss');
    }
    return tooltip;
  }

  editProject(): void {
    const dialog = this.dialogService.editInput(this.project.name);
    dialog.afterClosed().subscribe((input: string) => {
      if (input && input.length > 0) {
        this.project.name = input;
        this.dashboardService.updateProjet(this.project).subscribe(
          () => { },
          error => console.error(error)
        );
      }
    })
  }


  updateTask(task: TaskModel): Observable<any> {
    return this.dashboardService.updateTask(task);
  }

  editTask(task: TaskModel): void {
    const dialog = this.dialogService.editInput(task.description);
    dialog.afterClosed().subscribe((input: string) => {
      if (input && input.length > 0) {
        const _task = this.project.tasks.find(item => item.id === task.id) as TaskModel;
        _task.description = input;
        this.updateTask(_task).subscribe(
          () => { },
          error => console.error(error)
        );
      }
    })
  }

  deleteTask(id: number): void {
    const confirmation = this.dialogService.confirmation("Do you realy want delete this task?");
    confirmation.afterClosed().subscribe((ok) => {
      if (ok) {
        this.dashboardService.deleteTask(id).subscribe(() => {
          this.project.tasks = this.project.tasks.filter((item) => item.id !== id);
        }, error => console.error(error));
      }
    })
  }

}
