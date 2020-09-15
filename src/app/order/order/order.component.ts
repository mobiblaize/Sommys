import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  pastries = [
    {'name': 'Soft sponge cake', 'value': 'sponge-cake'},
    {'name': 'Red velvet cake', 'value': 'velvet-cake'},
    {'name': 'Chocolate cake', 'value': 'chocolate-cake'},
    {'name': 'Vanilla cake', 'value': 'vanilla-cake'},
    {'name': 'Fondant cake', 'value': 'fondant-cake'},
    {'name': 'Butter cake', 'value': 'butter-cake'},
    {'name': 'Meat-pie', 'value': 'meat-pie'},
    {'name': 'Samosa', "value": 'samosa'},
    {'name': 'Puff puff', "value": 'Puff-puff'},
    {'name': 'Long chin chin', "value": 'long-chin'},
    {'name': 'Short chin chin', "value": 'short-chin'},
    {'name': 'Peanuts', "value": 'peanuts'},
    {'name': 'Sausage', "value": 'sausage'},
    {'name': 'Pizza', "value": 'pizza'},
    {'name': 'Butter cookies', "value": 'butter-cookies'},
    {'name': 'Bread pizza', "value": 'bread-pizza'},
    {'name': 'Bread', "value": 'bread'},
    {'name': 'Pop corn', "value": 'pop-corn'},
  ]
  errors = [];

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private authService: AuthService
    ) { }

  orderForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.required, Validators.minLength(9)]],
    email: ['', [Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
    location: ['', Validators.required],
    pastries: this.fb.group({
      pastry: ['butter-cake'],
      size: ['regular'],
    }),
    deliveryDate: ['', Validators.required]
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let product = params.get('product');
      if(typeof product!='undefined' && product && this.pastries.filter(i => i.value === product).length > 0){
        this.orderForm.patchValue({
          pastries: {
            pastry: product
          } 
          });
     }
     
    });
   
  }
  onChange() {
    this.router.navigate(['/order', this.orderForm.get(['pastries', 'pastry']).value]);
  }

  clearForm() {
    this.orderForm.reset();
    this.orderForm.patchValue({
      pastries: {
        pastry: 'butter-cake',
        size: 'regular'
      }
    });
  }

  onSubmit() {
    if (this.orderForm.invalid) {
      return this.flashMessage.show ('Please fill in the form correctly', {cssClass: 'alert-danger', timeout: 3000});
    }
    this.authService.placeOrder(this.orderForm.value).subscribe(data => {      
      this.errors = data.errors;
      if(data.success) {
        this.flashMessage.show (`Thanks ${this.orderForm.get('name').value} for placing your order`, {cssClass: 'alert-success', timeout: 3000});
        this.clearForm();
      } else {
        this.flashMessage.show (this.errors[0].text, {cssClass: 'alert-danger', timeout: 3000});
      }
    })
  }

}
