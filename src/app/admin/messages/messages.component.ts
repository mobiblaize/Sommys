import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages = [];
  query = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getMessages().subscribe(data => {
      this.messages = data.messages;
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.router.navigate(['/admin/login']);
        }
      }
      console.log(err);
    });
  }

  searchMessage() {
    let query = {query : this.query}
    this.authService.searchMessages(query).subscribe(data => {
      this.messages = data.messages;
    }, err => {
      console.log(err);
    })
  }

}
