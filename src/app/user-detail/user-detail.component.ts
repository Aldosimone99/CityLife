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
  newPost: string = ''; // Add a newPost variable to store the new post content

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      const userIdNumber = Number(userId); // Converti la stringa in numero
      if (!isNaN(userIdNumber)) {
        this.loadUserData(userIdNumber);
      } else {
        console.error('Invalid user ID:', userId);
      }
    } else {
      console.error('User ID not found in route parameters');
    }
  }

  loadUserData(userId: number): void {
    if (!this.user) {
      this.userService.getUser(userId).subscribe(user => {
        this.user = user;
      });
    }
    if (this.posts.length === 0) {
      this.userService.getUserPosts(userId).subscribe(posts => {
        this.posts = posts;
      });
    }
  }

  toggleComments(postId: number): void {
    if (!this.comments[postId]) {
      this.userService.getPostComments(postId).subscribe((comments: any[]) => {
        this.comments[postId] = comments;
        this.showComments[postId] = true;
      });
    } else {
      this.showComments[postId] = !this.showComments[postId];
    }
  }

  addPost(): void {
    if (this.newPost.trim()) {
      const post = {
        userId: this.user.id,
        body: this.newPost,
      };
      this.userService.addPost(post).subscribe((newPost: any) => {
        this.posts.unshift(newPost); // Add the new post to the beginning of the posts array
        this.newPost = ''; // Clear the input field
      });
    }
  }
}