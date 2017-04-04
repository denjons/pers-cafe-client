import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product.model';


@Component({
    selector: "product-item",
    templateUrl: "./product-item.component.html",
    styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit{

    @Input() product: Product;

    price: string;
    price2: string;


    ngOnInit(){
        var priceArr = this.product.price.toFixed(2).toString().split(".");
        this.price = priceArr[0];
        if(priceArr.length > 1){
            this.price2 = priceArr[1];
        }else{
            this.price2 = ".00";
        }
    }


}