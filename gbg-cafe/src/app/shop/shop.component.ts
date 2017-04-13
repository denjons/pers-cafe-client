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
import { ImgService } from '../shared/img/img.service';
import { CartComponent } from "../core/cart/cart.component";
import { RecieptItemComponent } from "../reciept/reciept.component";

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
    user: User;
    cart: CartItem[];
    trashCan: Category;
 
    reciept : boolean;
    loading : boolean;


    @ViewChild(FilterTextComponent) filterComponent: FilterTextComponent;
    @ViewChild(CartComponent) cartComponent: CartComponent;
    @ViewChild(RecieptItemComponent) recieptComponent: RecieptItemComponent;

    constructor(
        private productService: ProductService, 
        private router: Router,
        private filterTextService: FilterTextService,
        private imgService: ImgService){
            this.loading = false;
            this.reciept = false;
            
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
        this.cartComponent.addToCart(product);
    }

    purchase(cart:CartItem[]){
        this.startLoading();

        console.log("todo: show spinner");
        this.productService.purchase(cart, this.shop).subscribe(
            response => {
                 this.stopLoading();
                if(response.status == 204){
                    this.purchaseSucess(response.json());
                }else if(response.status == 401){
                    console.log("Unauthorized: logging out.");
                    console.log(response.json());
                    this.logout();
                }else{
                    console.log("todo: show error message: ");
                    console.log(response.json());
                }
            },
            error => {
                if(error.status==401){
                    this.logout();
                }else{
                    console.log("todo: show error message: ");
                    console.log(error.json());
                }
            }
        );
    }

    private purchaseSucess(result: any){
       
        console.log("todo: show reciept?: ");
        console.log(result);
        this.showReciept();
    }

    showReciept(){
        this.cart = this.cartComponent.getCart();
        console.log("showing reciept");
        this.reciept = true;
    }

    hideReciept(evt:any){
        console.log("hiding reciept");
        this.cartComponent.clearCart();
        this.reciept = false;
    }

    navigate(id:any){
        this.filterComponent.clear();
        for(let category of this.categories){
            if(category.id == id){
                category.isActive = true;
                this.getProductsForCategory(category);
            }else{
                category.isActive = false;
            }
        }
        return false;
    }

    getProductsForCategory(category: Category){
        this.selectedCategory = category;
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
        for(let category of this.categories){
            this.initCategory(category);
        }
        this.categories = this.categories.filter(cat => cat.name !== "trash");

        this.selectedCategory = this.categories[0];
        this.selectedCategory.isActive = true;

        this.stopLoading();
    }

    private initCategory(category: Category){
        category.imgSrc = this.imgService.getImg(category.img);
        category.products.forEach(prod => prod.img = category.img);
        if(category.name === "trash"){
            this.trashCan = category; 
        }
    }

    private initShops(){
        // start by always taking the first shop
        // maybe add functionality for more shops later
        this.startLoading();
        this.productService.getShops().subscribe(
            user => {
                if(user != null && user.shops.length > 0){ 
                    console.log("todo: add check on categories here");
                    this.populateFields(user);
                }else{
                    console.log("no shops: show message to user");
                }
            },
            error => {
                this.errorMessage = <any>error;
                if(error.status == 401){
                    this.logout();
                }
        }
        );
    }

    logout(){
        localStorage.setItem("id_token", null);
        this.router.navigate(['login']);
    }

    startLoading(){
        this.loading = true;
    }

    stopLoading(){
        this.loading = false;
    }

}