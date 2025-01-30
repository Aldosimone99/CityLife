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
  user: any;
  posts: any[] = [];
  comments: { [key: number]: any[] } = {};
  showComments: { [key: number]: boolean } = {};

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      const userIdNumber = Number(userId); // Converti la stringa in numero
      if (!isNaN(userIdNumber)) {
        this.userService.getUser(userIdNumber).subscribe(user => {
          this.user = user;
        });
        this.userService.getUserPosts(userIdNumber).subscribe(posts => {
          this.posts = posts;
        });
      } else {
        console.error('Invalid user ID:', userId);
      }
    } else {
      console.error('User ID not found in route parameters');
    }
  }

  toggleComments(postId: number): void {
    if (!this.comments[postId]) {
      this.userService.getPostComments(postId).subscribe(comments => {
        this.comments[postId] = comments;
        this.showComments[postId] = true;
      });
    } else {
      this.showComments[postId] = !this.showComments[postId];
    }
  }
}