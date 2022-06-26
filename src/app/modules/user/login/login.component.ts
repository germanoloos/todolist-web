import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/core/services/dialog.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewChecked {

  loginForm!: FormGroup;
  loading = true;
  loadingButton = false;
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private dialog: DialogService,
    private router: Router
  ) {
    if (this.authenticationService.isAuthenticated()){
      this.router.navigate(['/']);
    }
  }

  ngAfterViewChecked(): void {
    setTimeout(() =>
      this.loading = false, 100
    );
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.min(8)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid ) {
      this.loginForm.markAllAsTouched();
      return
    }
    
    this.loginForm.disable();
    this.loadingButton = true;
    this.authenticationService.login(
      this.loginForm.get('email')?.value,
      this.loginForm.get('password')?.value).subscribe({
        next: (resp) => {
          this.authenticationService.setToken(resp.token);
          this.authenticationService.setUser(resp.user);
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.dialog.alert(error.error.message);
          this.loginForm.enable();
          this.loadingButton = false;
        }
      });
  }

}
