import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  standalone: false,
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  filteredPosts: any[] = [];
  searchTerm: string = '';

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getPosts().subscribe(data => {
      this.posts = data;
      this.filteredPosts = data;
    });
  }

  searchPosts() {
    this.filteredPosts = this.posts.filter(post =>
      post.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  createPost() {
    const newPost = {
      title: 'New Post Title',
      body: 'New Post Body',
      user_id: 1 // Replace with the actual user ID
    };
    this.postService.createPost(newPost).subscribe(post => {
      this.posts.push(post);
      this.filteredPosts = this.posts;
    });
  }

  viewComments(postId: number) {
    // Implement view comments logic
  }
}