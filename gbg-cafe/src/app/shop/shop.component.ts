import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
        private router: Router){
            this.totalPrice = 0;
            this.totalProducts = 0;

    }

    addToCart(product:Product){
        this.updateCart(product);
    }

    updateCart(product : Product){
        // update existing cart item
        for(let item of this.cart){
            if(item.product.id == product.id){
               this.increaseItem(product);
               return;
            }
        }
        // new cart item
        var cartItem = new CartItem()
        cartItem.addproduct(product);
        this.cart.push(cartItem);
        this.updateCartInfo(product.price, 1);
    }

    // handle increaseing products in cart
    increaseItem(product: Product){

        this.cart.map(item => {if(item.product.id == product.id){
            item.increase();
        }});

        this.updateCartInfo(product.price, 1);

        console.log("todo: update product-item if quantity <= 0");

        console.log("cart item was increased, active is "+product.active);
    }

    // handle cecreasing products in cart
    decreaseItem(product: Product){

        this.cart.map(item => {if(item.product.id == product.id){
            item.decrease();
        }});

        this.updateCartInfo(-product.price, -1);
        console.log("cart item was decreased, active is "+product.active);

        this.cart = this.cart.filter(prod => prod.quantity > 0);
    }

    removeItem(cartItem: CartItem){
        console.log("-------- removing cart item ------");
        console.log(cartItem);

        console.log(cartItem.quantity);
        console.log(cartItem.product.price);
        this.updateCartInfo(- cartItem.quantity * cartItem.product.price, - cartItem.quantity);

        console.log("removed product "+cartItem.product.name);
        cartItem.reset();
        this.cart = this.cart.filter(item => item.product.id != cartItem.product.id);
    }

    private updateCartInfo(price :number, quantity: number){
        this.totalPrice = this.totalPrice + price;
        this.totalProducts = this.totalProducts + quantity;
    }


    purchase(){
        console.log("todo: shoe spinner");
        this.productService.purchase(this.cart, this.shop).subscribe(
            response => {
                if(response.status == 204){
                    this.purchaseSucess(response.json());
                }else if(response.status == 401){
                    console.log("todo: show error message: ");
                    console.log(response.json());
                }else{
                    console.log("todo: show error message: ");
                    console.log(response.json());
                }
            },
            error => this.errorMessage = <any>error
        );
    }

    private purchaseSucess(result: any){
        console.log("todo: show reciept?: ");
        console.log(result);
        this.clearCart();
    }

    public clearCart(){
        console.log("clearing cart");
        var temp = new Array();
        this.cart.forEach(temp.push);
        temp.forEach(this.removeItem);
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