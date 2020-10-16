import { Component } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthAdminService } from './services/auth-admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sommy';

  constructor(
    public authAdminService: AuthAdminService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  onLogout() {
    this.authAdminService.logOut();
    this.flashMessage.show( 'You are logged out', {
      cssClass: 'alert-success mb-0',
      timeOut: 3000 
    });
    this.router.navigate(['admin/login']);
  }

}
