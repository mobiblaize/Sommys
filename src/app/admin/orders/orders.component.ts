import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthAdminService } from 'src/app/services/auth-admin.service';
import { NgProgress, NgProgressRef } from 'ngx-progressbar';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders = [];
  query = '';

  progressRef: NgProgressRef;
  constructor(
    private progress: NgProgress,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private authAdminService: AuthAdminService
  ) { }

  ngOnInit(): void {
    this.progressRef = this.progress.ref('myProgress');
    this.authAdminService.getOrders().subscribe(data => {
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
    let query = {query : this.query};
    this.progressRef.start();      
    this.authAdminService.searchOrders(query).subscribe(data => {
      this.orders = data.orders;
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

  delivered(i, submitBtn: HTMLButtonElement) {
    let order = { id: this.orders[i]._id, delivered: !this.orders[i].delivered}
    submitBtn.disabled = true;
    this.progressRef.start();
    this.authAdminService.deliverOrder(order).subscribe(data => {
      this.orders[i] = data.order;
      if (data.order.delivered) {
        this.flashMessage.show ('Order status: Delivered', {cssClass: 'alert-success mb-0', timeout: 1000});
      } else {
        this.flashMessage.show ('Order status: Pending', {cssClass: 'alert-secondary mb-0', timeout: 1000});
      }
      this.progressRef.complete();
      submitBtn.disabled  = false;
    }, err => {
      console.log(err);
      this.progressRef.complete();
      submitBtn.disabled  = false;
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.router.navigate(['/admin/login']);
        }
      }
    });
  }
}
