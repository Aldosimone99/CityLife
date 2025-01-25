import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  standalone: false,
})
export class UserDetailComponent implements OnInit {
  user: any;
  userPosts: any[] = [];

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUser(userId).subscribe(data => this.user = data);
      this.userService.getUserPosts(userId).subscribe(data => this.userPosts = data);
    } else {
      // Handle the case where userId is null
      console.error('User ID is null');
    }
  }

  viewComments(postId: number) {
    // Implement view comments logic
  }
}