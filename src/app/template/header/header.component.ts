import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '@app/core/model/user.model';
import { AuthenticationService } from '@app/modules/user/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  getUser(): UserModel{
    return this.authenticationService.getUser();
  }

  isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated();
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }


}
