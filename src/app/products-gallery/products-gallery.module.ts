import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsGalleryRoutingModule } from './products-gallery-routing.module';
import { ProductsGalleryComponent } from './products-gallery/products-gallery.component';


@NgModule({
  declarations: [ProductsGalleryComponent],
  imports: [
    CommonModule,
    ProductsGalleryRoutingModule
  ]
})
export class ProductsGalleryModule { }
