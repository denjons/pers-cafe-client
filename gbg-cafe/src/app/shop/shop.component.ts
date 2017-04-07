import { Component,  OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../core/product/product.model';
import { Shop } from '../core/shop/shop.model'; 
import { User } from '../core/shop/user.model'; 
import { Category } from '../core/shop/category.model'; 
import { ProductService } from '../core/product/product.service';
import { CartItem } from '../core/cart/cart-item.model';
import { FilterTextComponent } from '../shared/filter/filter-text.component';
import {  FilterTextService} from '../shared/filter/filter-text.service';

@Component({
    selector:"shop",
    templateUrl:"./shop.component.html",
    styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{

    products: Product[];
    visibleProducts: Product[];
    categories: Category[];
    shop: Shop;
    selectedCategory : Category;
    imgCache : any;
    user: User;
    cart: CartItem[];
    totalPrice : number;
    totalProducts : number;

    reciept : boolean;

    @ViewChild(FilterTextComponent) filterComponent: FilterTextComponent;

    constructor(
        private productService: ProductService, 
        private router: Router,
        private filterTextService: FilterTextService){
            this.totalPrice = 0;
            this.totalProducts = 0;

    }

    ngOnInit(){
        console.log("initializing");
        this.initShops();
    }

    filterChaged(filter: string){
        if(filter.length > 0){
            this.visibleProducts = 
                this.filterVisibleProducts(this.products.filter(prod => this.filterTextService.filter(prod.name, filter)));
        }else{
            this.visibleProducts = this.filterVisibleProducts(this.selectedCategory.products);
        }
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

        this.cart.map(item => {if(item.product.id == product.id && product.quantity > 0){
            item.increase();
            this.updateCartInfo(product.price, 1);
        }});
        console.log("todo: update product-item if quantity <= 0");
    }

    // handle cecreasing products in cart
    decreaseItem(product: Product){

        this.cart.map(item => {if(item.product.id == product.id && item.quantity > 0){
            item.decrease();
            this.updateCartInfo(-product.price, -1);
        }});

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
        console.log("todo: show spinner");
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
        this.showReciept();
        this.clearCart();
    }


    public clearCart(){
        console.log("clearing cart");
        for(let item of this.cart){
            this.updateCartInfo(- item.quantity * item.product.price, - item.quantity);
        }
        this.cart = new Array();

    }


    showReciept(){
        console.log("showing reciept");
        this.reciept = true;
    }

    hideReciept(){
        console.log("hiding reciept");
        this.reciept = false;
    }

    navigate(id:any){
        for(let category of this.categories){
            if(category.id == id){
                this.selectedCategory = category;
                this.getProductsForCategory(category);
            }
        }
        return false;
    }

    getProductsForCategory(category: Category){

        var prodTemp = new Array();
        if(category.name === "all"){
            console.log("adding all");
            prodTemp = this.products;
        }else{
            prodTemp = category.products;
        }
        
        this.visibleProducts = this.filterVisibleProducts(prodTemp); 
        
}

    filterVisibleProducts(products: Product[]){
        return products.filter(prod => prod.active == true || this.user.user_type == 'ADMIN');
    }

    private errorMessage(error: any){
        console.log(error);
    }

    private populateFields(user:User){
        this.user = user;
        this.shop = this.user.shops[0];
        this.products = new Array();
        for(let category of this.shop.categories){
            for(let prod of category.products){
                this.products.push(prod);
            }
        }
        this.visibleProducts = this.filterVisibleProducts(this.shop.categories[0].products);
        this.categories = this.shop.categories;
        this.selectedCategory = this.categories[0];
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