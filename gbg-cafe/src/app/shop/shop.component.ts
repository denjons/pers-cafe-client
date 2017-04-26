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
import { ProductEditComponent } from "../core/product/edit/product-edit.component";


@Component({
    selector:"shop",
    templateUrl:"./shop.component.html",
    styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{

    products: Product[];
    visibleProducts: Product[];
    categories: Category[];
    navigation: Category[];
    shop: Shop;
    selectedCategory : Category;
    user: User;
    cart: CartItem[];
    trashCan: Category;
    selectedProduct: Product;
 
    reciept : boolean;
    loading : boolean;
    editProduct: boolean;


    @ViewChild(FilterTextComponent) filterComponent: FilterTextComponent;
    @ViewChild(CartComponent) cartComponent: CartComponent;
    @ViewChild(RecieptItemComponent) recieptComponent: RecieptItemComponent;
    @ViewChild(ProductEditComponent) productEditComponent: ProductEditComponent;

    constructor(
        private productService: ProductService, 
        private router: Router,
        private filterTextService: FilterTextService,
        private imgService: ImgService){
            this.loading = false;
            this.reciept = false;
            this.editProduct = false;
            
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

    handleError(error: any){
        if(error.status == 401){
            this.logout();
        }else{
            console.log("todo: show error message: ");
            console.log(error.json());
        }
    }

    closeEdit(){
        this.productEditComponent.clear();
        this.editProduct = false;
    }

    addProduct(){
        
    }

    moveToTrash(product:Product){
        console.log("moving product to trash: "+product);
        this.startLoading();
        product.category_id = product.category.id;
        this.productService.removeProducts(product).subscribe(
            response => {
                this.stopLoading();
                if(response.status == 204){
                    console.log("product moved to trash");
                    this.productEditComponent.clear();
                    this.editProduct = false;
                    // update ategory and visible products
                    product.category.products = product.category.products.filter(prod => prod.id != product.id);
                    this.visibleProducts = this.visibleProducts.filter(prod => prod.id != product.id);
                    product.category = this.trashCan;
                    this.trashCan.products.push(product);
                    this.closeEdit();
                }
                else{
                    this.handleError(response);
                }
            },
            error => {
                this.stopLoading();
                this.handleError(error);
            }
        );
    }

    updateProduct(products: any){
        console.log("updating product: "+ products.edited);
        this.startLoading();
        products.edited.category = null;
        this.productService.updateProduct(products.edited).subscribe(
            response => {
                this.stopLoading();
                if(response.status == 204){
                    // server was updated, reflect changes in gui
                    this.productService.copy(products.edited, products.original);
                    // update visible products
                    this.visibleProducts = this.visibleProducts.filter(prod => true);
                    this.closeEdit();
                }
                else{
                    console.log(response.json());
                    this.handleError(response);
                }
            },
            error => {
                this.stopLoading();
                this.handleError(error);
            }
        );
        
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
                }else{
                    console.log(response.json());
                    this.handleError(response);
                }
            },
            error => {
                this.handleError(error);
            }
        );
    }

    showEditProduct(product: Product){
        console.log("show edit dialog with product: ");
        console.log(product);
        this.selectedProduct = product;
        this.editProduct = true;
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
        this.categories = this.shop.categories;
        

        for(let category of this.categories){
            this.initCategory(category);
        }
        
        this.navigation = this.categories.filter(cat => cat.name !== "trash");
        this.selectedCategory = this.navigation[0];
        this.selectedCategory.isActive = true;

         for(let category of this.navigation){
            for(let prod of category.products){
                this.products.push(prod);
            }
        }

        this.visibleProducts = this.filterVisibleProducts(this.navigation[0].products);

        this.stopLoading();
    }

    private initCategory(category: Category){
        category.imgSrc = this.imgService.getImg(category.img);
        category.products.forEach(prod => {
            prod.img = category.img; 
            prod.category = category;
        });
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
                this.handleError(error);
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