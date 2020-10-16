import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { MessagesComponent } from './messages/messages.component';
import { OrdersComponent } from './orders/orders.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { AuthAdminGuard } from '../guards/auth-admin.guard';
import { BlogComponent } from './blog/blog.component';
import { MessageItemComponent } from './message-item/message-item.component';

@NgModule({
  declarations: [
    AdminComponent, 
    MessagesComponent, 
    OrdersComponent, 
    AdminLoginComponent, 
    AdminRegisterComponent, 
    BlogComponent, MessageItemComponent
  ],

  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule
  ],

  providers: [
    AuthAdminGuard
  ],
})
export class AdminModule { }
