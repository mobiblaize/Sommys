import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { MessagesComponent } from './messages/messages.component';
import { OrdersComponent } from './orders/orders.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthAdminGuard } from '../guards/auth-admin.guard';


const routes: Routes = [
  { path: '', component: AdminComponent, canActivate: [AuthAdminGuard] },
  { path: 'messages', component: MessagesComponent, canActivate: [AuthAdminGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthAdminGuard] },
  { path: 'login', component: AdminLoginComponent },
  { path: 'register', component: AdminRegisterComponent, canActivate: [AuthAdminGuard] },
  {
    path: 'posts',
    loadChildren: () => import('../admin/post/post.module').then(m => m.PostModule), 
    canActivate: [AuthAdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
