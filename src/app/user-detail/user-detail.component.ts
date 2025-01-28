// filepath: /Users/aldosimone/Documents/GitHub/CityLife/src/app/user-detail/user-detail.component.ts
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
logout() {
throw new Error('Method not implemented.');
}
searchUser() {
throw new Error('Method not implemented.');
}
  userId!: number;
  user: any;
  posts: any[] = [];
  comments: { [key: number]: any[] } = {};

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.userService.getUsers(this.userId).subscribe(user => {
      this.user = user;
    });
    this.userService.getUserPosts(this.userId).subscribe(posts => {
      this.posts = posts;
      this.posts.forEach(post => {
        this.userService.getPostComments(post.id).subscribe(comments => {
          this.comments[post.id] = comments;
        });
      });
    });
  }
}