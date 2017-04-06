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

    getShops(){
        var token = localStorage.getItem("token_id");

        GCHeader.headers.set(GCHeader.AUTHORIZATION, localStorage.getItem("id_token"));

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
        purchase.shop_id = shop.id;

        GCHeader.headers.set(GCHeader.AUTHORIZATION, localStorage.getItem("id_token"));
        let body = JSON.stringify(purchase);

        return this.http.post(Urls.login, body, { headers: GCHeader.headers })
         .map((response: Response) => response)
         .do(content => {console.log(content)})
         .catch(this.handleError);

    }



}