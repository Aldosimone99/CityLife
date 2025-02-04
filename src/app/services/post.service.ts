import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'https://gorest.co.in/public/v2';
  private token = localStorage.getItem('authToken');

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/posts`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  getPostComments(postId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/posts/${postId}/comments`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  createPost(post: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/posts`, post, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  addComment(postId: number, comment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/posts/${postId}/comments`, comment, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  deletePost(postId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/posts/${postId}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  deleteComment(postId: number, commentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/posts/${postId}/comments/${commentId}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }
}