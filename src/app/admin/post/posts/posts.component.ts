import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgProgress, NgProgressRef } from 'ngx-progressbar';
import { AuthAdminService } from 'src/app/services/auth-admin.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts:[];

  progressRef: NgProgressRef;
  constructor(
    private progress: NgProgress,
    private authService: AuthAdminService,
    private router: Router,
    private flashMessage: FlashMessagesService
    ) { }

  ngOnInit(): void {
    this.progressRef = this.progress.ref('myProgress');
    this.authService.getPosts().subscribe(data => {
      this.posts = data.posts
    }, err => {
      console.log(err);
    });
  }

  editPost(post, submitBtn: HTMLButtonElement) {
    submitBtn.disabled = true;
    this.router.navigate(['/admin/posts', post._id]);
  }

  deletePost(i, submitBtn: HTMLButtonElement) {
    let post = this.posts[i]
    submitBtn.disabled = true;
    this.progressRef.start();
    this.authService.deletePost(post).subscribe(data => {
      this.flashMessage.show (data.message, {cssClass: 'alert-success', timeout: 3000});
      this.posts.splice(i, 1);
      this.progressRef.complete();
      submitBtn.disabled  = false;
    }, err => {
      console.log(err);
      this.progressRef.complete();
      submitBtn.disabled  = false;
      if (err instanceof HttpErrorResponse) {
        if (err.status === 501) {
          return this.flashMessage.show (err.error.message, {cssClass: 'alert-danger', timeout: 3000});
        }
        if (err.status === 404) {
          return this.flashMessage.show (err.error.message, {cssClass: 'alert-danger mb-0', timeout: 3000});
        } 
        return this.flashMessage.show ('An error occured try again later', {cssClass: 'alert-danger mb-0', timeout: 3000});
      }
    })
  }
}
