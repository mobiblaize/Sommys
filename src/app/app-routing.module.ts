import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  {
    path: 'gallery', 
    loadChildren: () => import('./products-gallery/products-gallery.module').then(m => m.ProductsGalleryModule)
  },
  {
    path: 'order', 
    loadChildren: () => import('./order/order.module').then(m => m.OrderModule)
  },
  {
    path: 'master', 
    loadChildren: () => import('./master-course/master-course.module').then(m => m.MasterCourseModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
