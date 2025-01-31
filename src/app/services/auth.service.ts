import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://gorest.co.in/public/v2/';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {}

  login(credentials: { token: string }): Observable<any> {
    // Simulate a successful login by returning an observable with the token
    this.setToken(credentials.token);
    return of({ success: true });
  }

  logout(): void {
    this.localStorageService.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  setToken(token: string): void {
    this.localStorageService.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return this.localStorageService.getItem(this.tokenKey);
  }
}