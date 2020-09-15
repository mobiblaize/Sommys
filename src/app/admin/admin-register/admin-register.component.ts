import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { passwordValidator } from 'src/app/validators/password.validator';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
    password: ['', Validators.required],
    confirmPassword: ['',Validators.required],
  }, 
  {validator: passwordValidator});

  ngOnInit(): void {
  }

  onRegisterSubmit() {
    if (this.registerForm.invalid) {
      return this.flashMessage.show ('Invalid info', {cssClass: 'alert-danger', timeout: 3000});
    }
    this.authService.adminRegister(this.registerForm.value).subscribe(data => {
      if (data.success) {
        this.flashMessage.show (data.msg, {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/admin']);
      } else {
        return this.flashMessage.show (data.msg, {cssClass: 'alert-danger', timeout: 3000});
      }
    }, err => {
      console.log('There was an error');
      if (err.status === 401) {
        return this.flashMessage.show ('Invalid info', {cssClass: 'alert-danger', timeout: 3000});
      }
      return false
    });
  }

}
