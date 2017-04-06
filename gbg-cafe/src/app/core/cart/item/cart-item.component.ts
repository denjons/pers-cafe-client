import { Component, OnInit, Input ,Output, EventEmitter} from '@angular/core';
import { Product } from '../../product/product.model';
import { CartItem } from '../cart-item.model';


@Component({
    selector: "cart-item",
    templateUrl: "./cart-item.component.html",
    styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit{
    @Input() cartItem: CartItem;
    product : Product;

    @Output() onIncrease = new EventEmitter;
    @Output() onDecrease = new EventEmitter;
    @Output() onRemove = new EventEmitter;

    price: string;
    price2: string;


    ngOnInit(){
        this.product = this.cartItem.product;
        console.log("cart item");
        console.log(this.product);
        var priceArr = this.product.price.toFixed(2).toString().split(".");
        this.price = priceArr[0];
        if(priceArr.length > 1){
            this.price2 = priceArr[1];
        }else{
            this.price2 = ".00";
        }
        
    }

    remove(){
        this.cartItem.reset();
        this.onRemove.emit(this.cartItem);
    }

    increase(){
        if(this.cartItem.increase()){
            this.onIncrease.emit(this.cartItem.product);
        }
    }

    decrease(){
        this.cartItem.decrease();
        this.onDecrease.emit(this.cartItem.product);
    }
}