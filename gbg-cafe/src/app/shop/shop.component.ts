import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../core/product/product.model';
import { Shop } from '../core/shop/shop.model'; 
import { User } from '../core/shop/user.model'; 
import { Category } from '../core/shop/category.model'; 
import { ProductService } from '../core/product/product.service';
import { CartItem } from '../core/cart/cart-item.model';

@Component({
    selector:"shop",
    templateUrl:"./shop.component.html",
    styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{

    products: Product[];
    categories: Category[];
    shop: Shop;
    imgCache : any;
    user: User;

    cart: CartItem[];

    totalPrice : number;
    totalProducts : number;

    constructor(
        private productService: ProductService, 
        private router: Router,
        private route: ActivatedRoute){
            this.totalPrice = 0;
            this.totalProducts = 0;

    }

    addToCart(product:Product){
        for(let prod of this.products){
            if(prod.id == product.id){
                this.updateCart(prod);
            }
        }
    }

    updateCart(product : Product){
        // update total price
        
        this.increaseItem(product);

        // update existing cart item
        for(let item of this.cart){
            if(item.product.id == product.id){
               item.addproduct(product);
               return;
            }
        }
        
        // new cart item
        var cartItem = new CartItem()
        cartItem.addproduct(product);
        this.cart.push(cartItem);
    }

    // handle increaseing products in cart
    increaseItem(product: Product){

        this.totalPrice = this.totalPrice + product.price;
        this.totalProducts = this.totalProducts + 1;

        if(product.quantity < 0){
            product.active = false;
        }

        console.log("cart item was increased, active is "+product.active);
    }

    // handle cecreasing products in cart
    decreaseItem(product: Product){
        this.totalPrice = this.totalPrice - product.price;
        this.totalProducts = this.totalProducts - 1;

        if(!product.active){
            product.active = true;
        }

        console.log("cart item was decreased, active is "+product.active);

        this.cart = this.cart.filter(prod => prod.quantity > 0);
        

    }


    navigate(id:any){
        for(var i = 0; i < this.shop.categories.length; i++){
            if(this.shop.categories[i].id == id){
                this.products = this.shop.categories[i].products;
            }
        }
        return false;
    }

    private errorMessage(error: any){
        console.log(error);
    }

    ngOnInit(){
        console.log("initializing");

        this.initShops();

        /*
        if(user != null && id != null){
            console.log("routing");
            this.populateFields(user);
            for(var i = 0; i < this.shop.categories.length; i++){
                if(this.shop.categories[i].id == id){
                    this.products = this.shop.categories[i].products;
                }
            }
        }else{
            
        }
        */
        
    }

    private populateFields(user:User){
        this.user = user;
        this.shop = this.user.shops[0];
        this.products = this.shop.categories[0].products;
        this.categories = this.shop.categories;
        this.cart = new Array();

        this.updateCart(this.products[0]);
        this.updateCart(this.products[1]);
        this.updateCart(this.products[2]);
    }

    private initShops(){
        // start by always taking the first shop
        // maybe add functionality for more shops later
        this.productService.getShops().subscribe(
            user => {
                if(user != null && user.shops.length > 0){ 
                    console.log("todo: add check on categories here");
                    this.populateFields(user);
                }else{
                    console.log("no shops: show message to user");
                }
            },
            error => this.errorMessage = <any>error
        );
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


}