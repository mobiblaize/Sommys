import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthAdminService } from '../../services/auth-admin.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  title = '';
  body = '';
  multipleImages = [];
  images = [];
  completion = 0;
  
  constructor(
    private authService: AuthAdminService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
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

  onSubmit(submitBtn: HTMLButtonElement) {
    const formData = new FormData();
    
    for(let img of this.multipleImages){
      formData.append('files', img);
    }
    formData.append('title', this.title);
    formData.append('body', this.body);

    submitBtn.disabled = true;
    this.authService.addPost(formData).subscribe(
      (event) => {
        if (event.type == HttpEventType.UploadProgress ) {
          this.completion = Math.round(event.loaded/event.total * 100)
          console.log('upload progress: ' + Math.round(event.loaded/event.total * 100) + ' %');
        } else if (event.type == HttpEventType.Response ) {
          this.flashMessage.show (event.body.message, {cssClass: 'alert-success mb-0', timeout: 5000});
          this.multipleImages = [];
          this.images = [];
          this.title =  '';
          this.body= '' ;
          this.completion = 0;
          submitBtn.disabled  = false;
        }
      },
      (err) => {
        console.log(err);
        this.completion = 0;
        submitBtn.disabled  = false;
        if (err instanceof HttpErrorResponse) {
          if (err.status === 501) {
            return this.flashMessage.show (err.error.error.message, {cssClass: 'alert-danger mb-0', timeout: 3000});
          }
          if (err.status === 401) {
            this.router.navigate(['/admin/login']);
          }
          return this.flashMessage.show ('An error occured try again', {cssClass: 'alert-danger mb-0', timeout: 3000});
        }
      }
    );
  }
}
