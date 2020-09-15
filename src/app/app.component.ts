import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sommy';

  constructor(
    public authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  onLogout() {
    this.authService.logOut();
    this.flashMessage.show( 'You are logged out', {
      cssClass: 'alert-success',
      timeOut: 3000 
    });
    this.router.navigate(['admin/login']);
  }

}
