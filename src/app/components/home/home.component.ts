import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {FlashMessagesService } from  'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
    ) { }

  contactForm: FormGroup;
  errors = [];

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      findUs: ['friends'],
      news: [true],
      message: ['', Validators.required]
    })

    this.contactForm.get('news').valueChanges
      .subscribe(checkedValue=>{
        const email = this.contactForm.get('email');
        if (checkedValue) {
          email.setValidators([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]);
        } else {
          email.clearValidators();
          email.setValidators(Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/));
        }
        email.updateValueAndValidity();
      });
  }

  toSection(id) {
    console.log(id);
    const yOffset = -80; 
    const element = document.getElementById(id);
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({top: y, behavior: 'smooth'});
  }

    onSubmit() {
      if (this.contactForm.invalid) {
        return this.flashMessage.show ('Please fill in the form correctly', {cssClass: 'alert-danger', timeout: 3000});
      }
      this.authService.sendMessage(this.contactForm.value).subscribe(data => {
        this.errors = data.errors;
        if(data.success) {
          this.flashMessage.show (`Thanks ${this.contactForm.get('name').value} for your feedback`, {cssClass: 'alert-success', timeout: 3000});
          this.contactForm.reset();
        } else {
          this.flashMessage.show (this.errors[0].text, {cssClass: 'alert-danger', timeout: 3000});
        }
      })
    }

}
