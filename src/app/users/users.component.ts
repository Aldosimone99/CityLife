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
  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';
  newUser: any = {
    name: '',
    email: '',
    gender: 'male',
    status: 'active'
  };
  isAddUserFormVisible: boolean = false;

  constructor(@Inject(UserService) private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
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
    console.log('Creating user:', this.newUser); // Log per debug
    this.userService.createUser(this.newUser).subscribe(user => {
      this.users.push(user);
      this.filteredUsers.push(user);
      this.resetForm();
      this.hideAddUserForm();
    }, error => {
      console.error('Error creating user:', error); // Log per debug
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

  onSubmit() {
    this.createUser();
  }

  resetForm() {
    this.newUser = {
      name: '',
      email: '',
      gender: 'male',
      status: 'active'
    };
  }

  showAddUserForm() {
    this.isAddUserFormVisible = true;
  }

  hideAddUserForm() {
    this.isAddUserFormVisible = false;
  }
}