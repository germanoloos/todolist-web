import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from '@app/core/services/dialog.service';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewChecked {

  signupForm!: FormGroup;
  inputType = 'password';
  loading = true;
  loadingButton = false;
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private userService: UserService,
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
    this.signupForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(8)]],
      name: [null, [Validators.required, Validators.min(3)]]
    });
  }

  onSubmit(): void {
    if (this.signupForm.invalid ) {
      this.signupForm.markAllAsTouched();
      return
    }
    if (this.signupForm.controls.password.value !== this.signupForm.controls.confirmPassword.value) {
      this.dialog.alert("Password and Confirm Password must be equals");
      this.signupForm.markAllAsTouched();
      return;
    }
    
    this.signupForm.disable();
    this.loadingButton = true;
    this.userService.signup(this.signupForm.value).subscribe({
        next: (resp) => {
          this.dialog.alert('User created with success');
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.dialog.alert(error.error.message);
          this.signupForm.enable();
          this.loadingButton = false;
        }
      });
  }

}
