import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  email: String;
  password: String;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  loginForm = this.fb.group({
    email: ['', [Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
    password: ['', Validators.required]
  });

  ngOnInit(): void {
    if (this.authService.loggedIn) {
      this.router.navigate(['/admin']);
    }
  }

  onLoginSubmit() {
    if (this.loginForm.invalid) {
      return this.flashMessage.show ('Invalid email or password', {cssClass: 'alert-danger', timeout: 3000});
    }
    this.authService.adminLogin(this.loginForm.value).subscribe(data => {
      if (data.success) {
        localStorage.setItem('token', data.token);
        this.flashMessage.show ('You are logged in', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/admin']);
      }   
      if (!data.success) {
        return this.flashMessage.show (data.msg, {cssClass: 'alert-danger', timeout: 3000});
      }
    }, err => {
      if (err.status === 401) {
        return this.flashMessage.show ('An error occured', {cssClass: 'alert-danger', timeout: 3000});
      }
      return false
    });
  }

}
