import { Component,  OnInit } from '@angular/core';
import { Product } from '../core/product/product.model';
import { ProductService } from '../core/product/product.service';

@Component({
    selector:"shop",
    templateUrl:"./shop.component.html",
    styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{

    cart: Product[];
    products: Product[];

    constructor(private productService: ProductService){
        
    }

    ngOnInit(){
        this.cart = new Array();
        this.products = this.productService.getProductsForShop();

        this.cart[0] = this.products[0];
        this.cart[1] = this.products[2];
        this.cart[3] = this.products[3];
    }

    


}