import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { StorageService } from './storage.service';
import { catchError, tap, throwError } from 'rxjs';

type TokenResponse = {
  token: string;
};

export type RegisterRequest = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: 'USER' | 'ADMIN' | 'MANAGER';
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/auth';
  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<TokenResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response: any) => {
          this.storageService.setToken(response.token);
          this.router.navigate(['/']);
        }),
        catchError((error) => {
          return throwError(() => new Error('Incorrect login, please try again.'));
        })
      );
  }

  register({ firstname, lastname, email, password, role }: RegisterRequest) {
    return this.http.post(`${this.apiUrl}/register`, { firstname, lastname, email, password, role })
      .pipe(
        tap((response: any) => {
          this.storageService.setToken(response.token);
          this.router.navigate(['/']);
        }),
        catchError((error) => {
          return throwError(() => new Error('Registration failed, please try again.'));
        }),
      );
  }

  logout() {
    this.storageService.clearToken();
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return !!this.storageService.getToken();
  }
}
