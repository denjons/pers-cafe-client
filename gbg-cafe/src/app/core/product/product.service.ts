import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'; 
import { Product } from './product.model';
import { User } from '../shop/user.model';
import { Shop } from '../shop/shop.model';
import { CartItem } from '../cart/cart-item.model';
import { Purchase } from '../shop/purchase.model';
import { GCHeader } from '../Headers';
import { Urls } from '../urls';

@Injectable()
export class ProductService{
   
    constructor(private http: Http){
        console.log("constructed");
    }

    private user: User;


    updateProduct(product:Product){
        var token = localStorage.getItem("id_token");

        GCHeader.headers.set(GCHeader.AUTHORIZATION, token);
        let body = this.productToJSON(product);

        return this.http
         .post(Urls.updateProduct,body,{ headers: GCHeader.headers })
         .map((response: Response) => response)
         .do(response => {console.log(response)})
         .catch(this.handleError);
    }

    removeProducts(product:Product){
        var token = localStorage.getItem("id_token");

        GCHeader.headers.set(GCHeader.AUTHORIZATION, token);
   
        let body = this.productToJSON(product);

        console.log("removing: "+body);
        
        return this.http
         .post(Urls.removeProduct,body,{ headers: GCHeader.headers })
         .map((response: Response) => response)
         .do(response => {console.log(response)})
         .catch(this.handleError);
    }

    private productToJSON(product:Product){
        var category = product.category;
        product.category = undefined;
        let body = JSON.stringify(product);
        product.category = category;
        return body;
    }

    getShops(){
        var token = localStorage.getItem("id_token");

        console.log("token is: "+token);

        GCHeader.headers.set(GCHeader.AUTHORIZATION, token);

        return this.http
         .get(Urls.getShop,{ headers: GCHeader.headers })
         .map((response: Response) => <User>response.json())
         .do(user => {this.user = user; console.log(user)})
         .catch(this.handleError);

    }

    public shopCache(){
        return this.user;
    }

   private handleError(error: Response) {
        console.error(error);
        let msg = `Error status code ${error.status} at ${error.url}`;
        return Observable.throw(msg);
    }

    public purchase(cartItems: CartItem[], shop: Shop){

        var purchase = new Purchase();
        purchase.cartItems = cartItems;
        for(let item of cartItems){
            item.product.category = null;
        }
        purchase.shop_id = shop.id;

        GCHeader.headers.set(GCHeader.AUTHORIZATION, localStorage.getItem("id_token"));
        let body = JSON.stringify(purchase);

        return this.http.post(Urls.purchase, body, { headers: GCHeader.headers })
         .map((response: Response) => response)
         .do(response => {console.log(response)})
         .catch(this.handleError);

    }

    public copy(from: Product, to:Product){
        to.id = from.id;
        to.name = from.name;
        to.description = from.description;
        to.price = from.price;
        to.quantity = from.quantity;
        to.size = from.size;
        to.active = from.active;
    }



}