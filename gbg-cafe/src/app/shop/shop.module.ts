import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartModule } from '../core/cart/cart-module';
import { ProductModule } from '../core/product/product.module';

import { ShopRoutingModule, routableComponents } from './shop-routing.module';



@NgModule({
  declarations: [
    routableComponents
  ],
  imports: [
    CommonModule,
    FormsModule,
    ShopRoutingModule,
    ProductModule
  ],
  exports:[ routableComponents],
  providers: [/*RequestService*/]
})
export class ShopModule { }