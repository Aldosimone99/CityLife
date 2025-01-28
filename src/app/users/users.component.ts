// filepath: /Users/aldosimone/Documents/GitHub/CityLife/src/app/users/users.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: false,
})
export class UsersComponent implements OnInit {
logout() {
throw new Error('Method not implemented.');
}
  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';

  constructor(@Inject(UserService) private userService: UserService, private router: Router) {}

  ngOnInit() {
    const userId = 1; // Replace with the appropriate userId
    this.userService.getUsers(userId).subscribe(data => {
      this.users = data;
      this.filteredUsers = data;
    });
  }

  searchUsers() {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  createUser() {
    const newUser = {
      name: 'New User',
      email: 'newuser@example.com',
      gender: 'male',
      status: 'active'
    };
    this.userService.createUser(newUser).subscribe(user => {
      this.users.push(user);
      this.filteredUsers.push(user);
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
      this.filteredUsers = this.filteredUsers.filter(user => user.id !== id);
    });
  }

  viewUser(id: number) {
    this.router.navigate(['/user', id]);
  }
}