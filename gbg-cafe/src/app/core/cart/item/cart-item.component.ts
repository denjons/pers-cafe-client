import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../product/product.model';


@Component({
    selector: "cart-item",
    templateUrl: "./cart-item.component.html",
    styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit{
    @Input() product: Product;

    price: string;
    price2: string;

      ngOnInit(){
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
}