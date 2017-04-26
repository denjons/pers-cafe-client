import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CartItem } from "./cart-item.model";
import { Product } from "../product/product.model";
import { User } from "../shop/user.model";

@Component({
    selector: "cart",
     templateUrl: "cart.component.html"
     
})
export class CartComponent implements OnInit{

    cart: CartItem[];
    totalPrice: number;
    totalProducts: number;

    @Input() user: User;
    @Output() onPurchase = new EventEmitter;


    ngOnInit(){
        this.cart = new Array();
        this.totalPrice = 0;
        this.totalProducts = 0;
    }

    getCart(){
        return this.cart;
    }


    purchase(){
        this.onPurchase.emit(this.cart);
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

        if(this.user.user_type === "ADMIN"){
            this.cart.map(item => {if(item.product.id == product.id){
                item.decrease();
                this.updateCartInfo(-product.price, -1);
            }});
        }else{
            this.cart.map(item => {if(item.product.id == product.id && item.quantity > 0){
                item.decrease();
                this.updateCartInfo(-product.price, -1);
            }});

            this.cart = this.cart.filter(prod => prod.quantity > 0);
        }
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

    public clearCart(){
        console.log("clearing cart");
        this.totalPrice = 0;
        this.totalProducts = 0;
        this.cart = new Array();
    }

    public emptyCart(){
        for(let item of this.cart){
            item.reset();
        }
        this.totalPrice = 0;
        this.totalProducts = 0;
        this.cart = new Array();
    };
}