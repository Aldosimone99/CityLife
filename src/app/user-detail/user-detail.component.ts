import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  standalone: false,
})
export class UserDetailComponent implements OnInit {
  userId!: number;
  user: any;
  posts: any[] = [];
  comments: { [key: number]: any[] } = {};
  showComments: { [key: number]: boolean } = {}; // Stato di visualizzazione dei commenti

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.userService.getUser(this.userId).subscribe(user => {
      this.user = user;
    });
    this.userService.getUserPosts(this.userId).subscribe(posts => {
      this.posts = posts;
      this.posts.forEach(post => {
        this.userService.getPostComments(post.id).subscribe(comments => {
          this.comments[post.id] = comments;
          this.showComments[post.id] = false; // Inizializza lo stato di visualizzazione dei commenti a false
        });
      });
    });
  }

  toggleComments(postId: number): void {
    this.showComments[postId] = !this.showComments[postId]; // Mostra/nascondi i commenti
  }
}