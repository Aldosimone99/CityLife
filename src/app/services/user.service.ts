import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://gorest.co.in/public/v2/';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`).pipe(
      catchError(this.handleError)
    );
  }

  getUser(userId: number): Observable<any> {
    if (isNaN(userId) || userId <= 0) {
      return throwError('Invalid user ID');
    }
    return this.http.get<any>(`${this.apiUrl}/users/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  getUserPosts(userId: number): Observable<any[]> {
    if (isNaN(userId) || userId <= 0) {
      return throwError('Invalid user ID');
    }
    return this.http.get<any[]>(`${this.apiUrl}/posts?user_id=${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  getPostComments(postId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/posts/${postId}/comments`).pipe(
      catchError(this.handleError)
    );
  }

  createUser(newUser: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, newUser).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}