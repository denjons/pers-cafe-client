import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ShopRoutingModule, routableComponents } from './shop-routing.module';



@NgModule({
  declarations: [
    routableComponents
  ],
  imports: [
    CommonModule,
    FormsModule,
    ShopRoutingModule
  ],
  exports:[ routableComponents],
  providers: [/*RequestService*/]
})
export class ShopModule { }