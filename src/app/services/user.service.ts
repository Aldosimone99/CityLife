// filepath: /Users/aldosimone/Documents/GitHub/CityLife/src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://gorest.co.in/public/v2/'; // URL delle API di GoRest
  private token: string = '20819aa165f3784f19bd5728ce8e41fac6f6105b26e2166baae3732ee24a965e'; // Sostituisci con il tuo token di accesso

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  getUsers(userId: number): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/users`, { headers });
  }

  getUserPosts(userId: number): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/posts?user_id=${userId}`, { headers });
  }

  getPostComments(postId: number): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/posts/${postId}/comments`, { headers });
  }

  deleteUser(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`, { headers });
  }

  createUser(user: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}/users`, user, { headers });
  }
}