import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '@app/core/model/user.model';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/core/services/storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  TOKEN_KEY = 'token';
  USER_KEY = 'user';

  constructor(private httpClient: HttpClient, private storageService: StorageService) { }

  login(email: string, password: string): Observable<any> {
    return this.httpClient.post(`${environment.API_URL}/auth/login`, { email, password });
  }

  logout(): void {
    this.storageService.removeItem(this.TOKEN_KEY);
    this.storageService.removeItem(this.USER_KEY);
  }

  getToken(): string {
    return this.storageService.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    this.storageService.setItem(this.TOKEN_KEY, token);
  }

  setUser(user: UserModel): void {
    this.storageService.setItem(this.USER_KEY, user);
  }

  getUser(): UserModel {
    return this.storageService.getItem(this.USER_KEY) as UserModel;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
