import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CartItem } from "./cart-item.model";
import { Product } from "../product/product.model";

@Component({
    selector: "cart",
     templateUrl: "cart.component.html"
     
})
export class CartComponent implements OnInit{

    @Input() cart: CartItem[];
    total: number; 

    constructor(){

    }

    ngOnInit(){

    }
}