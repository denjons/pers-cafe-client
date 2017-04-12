import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItem } from './cart-item.model';
import { CartComponent } from "./cart.component";

import { CartItemComponent } from './item/cart-item.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports:[
        CartItemComponent, CartComponent
    ],
    declarations: [CartItemComponent, CartComponent],
    providers: []
})
export class CartModule{

}