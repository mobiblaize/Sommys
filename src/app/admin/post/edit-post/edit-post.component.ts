import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Post } from '../../../models/post.model';
import { AuthAdminService } from 'src/app/services/auth-admin.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgProgress, NgProgressRef } from 'ngx-progressbar';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  post: Post = {
    title : '',
    body: '',
    images: []
  };
  multipleImages = [];
  images = [];
  completion = 0;
  
  progressRef: NgProgressRef;
  constructor(
    private progress: NgProgress,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthAdminService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
    this.progressRef = this.progress.ref('myProgress');
    this.route.paramMap.subscribe((params: ParamMap) => {
      let post = { id : params.get('id') };
      
      this.authService.getPost(post).subscribe(data => {
        this.post = data.post;
      }, err => {
        console.log(err);
        if (err instanceof HttpErrorResponse) {
          if (err.status === 404) {
            this.flashMessage.show (err.error.message, {cssClass: 'alert-danger mb-0', timeout: 3000});
            this.router.navigate(['/admin/posts']);
          } else {
            return this.flashMessage.show ('An error occured try again later', {cssClass: 'alert-danger mb-0', timeout: 3000});
          }
        }
      })
    });
  }

  onSelect(event){
    if (event.target.files.length > 0) {
      for (var i = 0, l = event.target.files.length; i < l; i++) {
        this.multipleImages.push(event.target.files[i])
      }
      this.images = [];
      Array.from(this.multipleImages).forEach((item, index) => {
        let reader = new FileReader();
        reader.readAsDataURL(item);
        reader.onload=(ev:any) => {
        this.images[index] = ev.target.result;
        }
      });
    }
  }

  removeFile(i) {
    this.multipleImages = this.multipleImages.filter((file, index) => {
      return index !== i 
    });
    this.images.splice(i, 1);
  }

  removeOldFile(i) {
    this.post.images.splice(i, 1);
  }

  onSubmit(submitBtn: HTMLButtonElement) {

    submitBtn.disabled = true;
    this.progressRef.start();
    this.completion = 0;
    const formData = new FormData();
    for(let img of this.multipleImages){
      formData.append('files', img);
    }
    formData.append('id', this.post._id.toString());
    formData.append('title', this.post.title.toString());
    formData.append('body', this.post.body.toString());
    for(let img of this.post.images){
      formData.append('images', img.toString());
    }

    this.authService.editPost(formData).subscribe(
      (event) => {
        if (event.type == HttpEventType.UploadProgress ) {
          this.completion = Math.round(event.loaded/event.total * 100)
          console.log('upload progress: ' + Math.round(event.loaded/event.total * 100) + ' %');
        } else if (event.type == HttpEventType.Response ) {
          this.flashMessage.show (event.body.message, {cssClass: 'alert-success mb-0', timeout: 3000});
          this.progressRef.complete();
          submitBtn.disabled  = false;
        }
      },
      (err) => {
        console.log(err);
        this.completion = 0;
        this.progressRef.complete();
        submitBtn.disabled  = false;
        if (err instanceof HttpErrorResponse) {
          if (err.status === 501) {
            return this.flashMessage.show (err.error.error.message, {cssClass: 'alert-danger mb-0', timeout: 3000});
          }
          if (err.status === 404) {
            this.flashMessage.show (err.error.message, {cssClass: 'alert-danger mb-0', timeout: 3000});
            this.router.navigate(['/admin']);
          } else {
            return this.flashMessage.show ('An error occured try again later', {cssClass: 'alert-danger mb-0', timeout: 3000});
          }
        }
      }
      
    );
  }

}
