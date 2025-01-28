import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  login(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get('https://gorest.co.in/public/v2/users', { headers });
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return this.token !== null || localStorage.getItem('token') !== null;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }
}