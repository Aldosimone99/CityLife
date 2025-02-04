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
  isDeleteConfirmationVisible: boolean = false;
  postIdToDelete: number | null = null;

  constructor(private postService: PostService, private userService: UserService) {}

  ngOnInit() {
    this.loadAllPosts();
  }

  searchPosts() {
    const filtered = this.posts.filter(post =>
      post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.filteredPosts = filtered.slice(0, this.postsPerPage); // Update the displayed posts based on the search term and selected number
  }

  createPost() {
    const newPost = {
      title: 'New Post Title',
      body: 'New Post Body',
      user_id: 1 // Replace with the actual user ID
    };
    this.postService.createPost(newPost).subscribe(post => {
      this.posts.push(post);
      this.filteredPosts = this.posts.slice(0, this.postsPerPage); // Update the displayed posts based on the selected number
    });
  }

  viewComments(postId: number) {
    // Implement view comments logic
  }

  confirmDeletePost(postId: number): void {
    this.postIdToDelete = postId;
    this.isDeleteConfirmationVisible = true;
  }

  cancelDeletePost(): void {
    this.postIdToDelete = null;
    this.isDeleteConfirmationVisible = false;
  }

  deletePost(): void {
    if (this.postIdToDelete !== null) {
      this.postService.deletePost(this.postIdToDelete).subscribe(() => {
        this.posts = this.posts.filter(post => post.id !== this.postIdToDelete);
        this.filteredPosts = this.posts.slice(0, this.postsPerPage); // Update the displayed posts based on the selected number
        this.cancelDeletePost();
      }, (error: any) => {
        console.error('Error deleting post:', error); // Log for debugging
        this.cancelDeletePost();
      });
    }
  }

  loadAllPosts(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
      this.filteredPosts = posts.slice(0, this.postsPerPage); // Display the initial set of posts
      this.posts.forEach(post => {
        this.userService.getUser(post.user_id).subscribe(user => {
          post.userName = user.name;
        });
      });
    }, error => {
      console.error('Error loading posts:', error); // Log for debugging
    });
  }

  updatePostsPerPage(): void {
    this.filteredPosts = this.posts.slice(0, this.postsPerPage); // Update the displayed posts based on the selected number
  }
}