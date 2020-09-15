import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders = [];
  query = '';

  constructor(
    private router: Router,
    private flashMessage: FlashMessagesService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getOrders().subscribe(data => {
      this.orders = data.orders;
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.router.navigate(['/admin/login']);
        }
      }
      console.log(err); 
    });
  }
  searchOrders() {
    let query = {query : this.query}    
    this.authService.searchOrders(query).subscribe(data => {
      this.orders = data.orders;
    }, err => {
      console.log(err);
    })
  }

}
