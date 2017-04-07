import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartModule } from '../core/cart/cart-module';
import { ProductModule } from '../core/product/product.module';

import { ShopRoutingModule, routableComponents } from './shop-routing.module';

import { ShopRouteActivatorService } from './shop-route-activator.service';

import { FilterTextModule } from '../shared/filter/filter-text.module';



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
    FilterTextModule
  ],
  exports:[ routableComponents],
  providers: [ShopRouteActivatorService]
})
export class ShopModule { }