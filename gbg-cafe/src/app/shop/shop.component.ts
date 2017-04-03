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

    title = "test ostra gbg";

    constructor(private productService: ProductService){
        
    }

    ngOnInit(){
        this.products = this.productService.getProductsForShop();
    }


}