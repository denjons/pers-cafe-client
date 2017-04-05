import { Component,  OnInit } from '@angular/core';
import { Product } from '../core/product/product.model';
import { Shop } from '../core/shop/shop.model'; 
import { Category } from '../core/shop/category.model'; 
import { ProductService } from '../core/product/product.service';

@Component({
    selector:"shop",
    templateUrl:"./shop.component.html",
    styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{

    cart: Product[];
    products: Product[];
    categories: Category[];
    shop: Shop;
    imgCache : any;

    constructor(private productService: ProductService){

    }

    getImages(){
        console.log("onload");
        this.imgCache = new Array();
        var names = ["soda", "snacks", "food", "other", "all"];

        for(var i = 0; i < names.length; i++){
            var elm = document.getElementById(names[i]);
             this.imgCache[names[i]] = elm;
             this.imgCache[names[i]].parentElement.removeChild(elm);
        }
    }

    loadCategoryImage(category: Category){
        console.log("loading image");

        category.imgElm = this.imgCache[category.image].src;
        console.log(category.imgElm);
    }

    private errorMessage(error: any){
        console.log(error);
    }

    ngOnInit(){
        console.log("initializing");

        // start by always taking the first shop
        // maybe add functionality for more shops later
        this.productService.getShops().subscribe(
            shops => {
                if(shops != null && shops.length > 0){ 
                    console.log("todo: add check on categories here");
                    this.shop = shops[0];
                    this.products = this.shop.categories[0].products;
                    this.categories = this.shop.categories;
                    this.cart = new Array();

                    this.cart[0] = this.products[0];
                    this.cart[1] = this.products[1];
                    this.cart[2] = this.products[2];
                }else{
                    console.log("no shops: show message to user");
                }
            },
            error => this.errorMessage = <any>error
        );

        
  
        

        
    }

    


}