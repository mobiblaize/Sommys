import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  index = 0;
  posts:Post[] = [];
  blogPost:Post;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getPosts().subscribe(data => {
      for (let post of data.posts) {
        this.posts.push({ 
          title: post.title, 
          images: post.images, 
          body: post.body
        });
      }
      this.blogPost = this.posts[this.index];
    }, err => {
      console.log(err);
    });
  }

  previousPost () {
    if (this.index <= 0) return this.blogPost = this.posts[this.index];
    this.index -= 1;
    return this.blogPost = this.posts[this.index];
  }

  nextPost () {
    this.index += 1;
    return this.blogPost = this.posts[this.index];
  }
}
