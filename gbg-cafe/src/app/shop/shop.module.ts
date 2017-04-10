import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartModule } from '../core/cart/cart-module';
import { ProductModule } from '../core/product/product.module';

import { ShopRoutingModule, routableComponents } from './shop-routing.module';

import { FilterTextModule } from '../shared/filter/filter-text.module';

import { ImgModule } from '../shared/img/img.module';

import { RecieptModule } from '../reciept/reciept.module';



@NgModule({
  declarations: [
    routableComponents
  ],
  imports: [
    CommonModule,
    FormsModule,
    ShopRoutingModule,
    ProductModule,
    CartModule,
    FilterTextModule,
    ImgModule,
    RecieptModule
  ],
  exports:[ routableComponents]
})
export class ShopModule { }