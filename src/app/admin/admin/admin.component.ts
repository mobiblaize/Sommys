import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthAdminService } from 'src/app/services/auth-admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  user = <any>{};

  constructor(
    private router: Router,
    private authService: AuthAdminService
    ) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(data => {
      this.user = data;
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.router.navigate(['/admin/login']);
        }
      }
      console.log(err); 
    });
  }

}
