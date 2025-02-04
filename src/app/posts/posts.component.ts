import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  standalone: false,
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  filteredPosts: any[] = [];
  searchTerm: string = '';
  postsPerPage: number = 10; // Default number of posts per page
  postsPerPageOptions: number[] = [5, 10, 20, 50]; // Options for posts per page
  currentPage: number = 1; // Current page number
  totalPages: number = 1; // Total number of pages
  comments: { [key: number]: any[] } = {}; // Store comments for each post
  showComments: { [key: number]: boolean } = {}; // Control visibility of comments for each post

  constructor(private postService: PostService, private userService: UserService) {}

  ngOnInit() {
    this.loadAllPosts();
  }

  loadAllPosts(): void {
    this.userService.getAllPosts().subscribe(posts => {
      this.posts = posts;
      this.totalPages = Math.ceil(this.posts.length / this.postsPerPage); // Calculate total pages
      this.updatePostsPerPage();
      this.posts.forEach(post => {
        this.userService.getUser(post.user_id).subscribe(user => {
          post.userName = user.name;
        });
      });
    }, error => {
      console.error('Error loading posts:', error); // Log for debugging
    });
  }

  searchPosts(): void {
    const filtered = this.posts.filter(post =>
      post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.filteredPosts = filtered.slice(0, this.postsPerPage); // Update the displayed posts based on the search term and selected number
    this.totalPages = Math.ceil(filtered.length / this.postsPerPage); // Update total pages based on filtered posts
    this.currentPage = 1; // Reset to first page
  }

  updatePostsPerPage(): void {
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    const endIndex = startIndex + this.postsPerPage;
    this.filteredPosts = this.posts.slice(startIndex, endIndex); // Update the displayed posts based on the selected number
    this.totalPages = Math.ceil(this.posts.length / this.postsPerPage); // Update total pages
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePostsPerPage();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePostsPerPage();
    }
  }

  viewComments(postId: number): void {
    if (!this.comments[postId]) {
      this.userService.getPostComments(postId).subscribe(comments => {
        this.comments[postId] = comments;
        this.showComments[postId] = true;
      }, error => {
        console.error('Error loading comments:', error); // Log for debugging
      });
    } else {
      this.showComments[postId] = !this.showComments[postId];
    }
  }
}