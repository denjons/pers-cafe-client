import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../product/product.model';


@Component({
    selector: "cart-item",
    templateUrl: "./cart-item.component.html",
    styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent{
    @Input() product: Product;
}