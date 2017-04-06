import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItem } from './cart-item.model';

import { CartItemComponent } from './item/cart-item.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports:[
        CartItemComponent
    ],
    declarations: [CartItemComponent],
    providers: []
})
export class CartModule{

}