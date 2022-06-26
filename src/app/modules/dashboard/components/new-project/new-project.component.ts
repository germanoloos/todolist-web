import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  @Output() createRequest = new EventEmitter<any>();

  projectForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService
  ) {
  }

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      name: [null, Validators.required]
    });
  }

  onSubmit(formDirective: FormGroupDirective): void {
    if (this.projectForm.invalid ) {
      this.projectForm.markAllAsTouched();
      return
    }
    this.dashboardService.newProject(this.projectForm.value).subscribe(() => {
      this.createRequest.emit(true);
      this.projectForm.reset();
      formDirective.resetForm();
    })
  }
}
