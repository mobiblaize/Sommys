import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthAdminService } from 'src/app/services/auth-admin.service';
import { Message } from '../../models/message.model';
import { NgProgress, NgProgressRef } from 'ngx-progressbar';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages:Message[] = [];
  query = '';
  moreBtnActive = false;

  progressRef: NgProgressRef;
  constructor(
    private progress: NgProgress,
    private router: Router,
    private authService: AuthAdminService
  ) { }

  ngOnInit(): void {
    this.progressRef = this.progress.ref('myProgress');
    this.moreBtnActive = true;
    this.authService.getMessages({ size: this.messages.length }).subscribe(data => {
      this.messages =  this.messages.concat(data.messages);      
      if ( data.messages.length == 0 ) {
        this.moreBtnActive = false;
      }
    }, err => {
      console.log(err);
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.router.navigate(['/admin/login']);
        }
      }
    });
  }

  searchMessage() {
    let query = {query : this.query};
    this.progressRef.start();
    this.authService.searchMessages(query).subscribe(data => {
      this.messages = data.messages;
      this.progressRef.complete();
    }, err => {
      console.log(err);
      this.progressRef.complete();
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.router.navigate(['/admin/login']);
        }
      }
    })
  }

  moreMessages() {
    this.authService.getMessages({ size: this.messages.length }).subscribe(data => {
      this.messages =  this.messages.concat(data.messages);      
      if ( data.messages.length == 0 ) {
        this.moreBtnActive = false;
      }
    }, err => {
      console.log(err);
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.router.navigate(['/admin/login']);
        }
      }
    });
  }

}
