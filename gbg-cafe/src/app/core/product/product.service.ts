import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'; 
import { Product } from './product.model';
import { Shop } from '../shop/shop.model';
import { GCHeader } from '../Headers';
import { Urls } from '../urls';

@Injectable()
export class ProductService{
   
    constructor(private http: Http){
        console.log("constructed");
    }

    shop: Shop[];

    getShops(){
        var token = localStorage.getItem("token_id");

        GCHeader.headers.set(GCHeader.AUTHORIZATION, localStorage.getItem("id_token"));

        return this.http
         .get(Urls.getShop,{ headers: GCHeader.headers })
         .map((response: Response) => <Shop[]>response.json().shops)
         .do(shop => {this.shop = shop; console.log(shop)})
         .catch(this.handleError);

    }

   private handleError(error: Response) {
        console.error(error);
        let msg = `Error status code ${error.status} at ${error.url}`;
        return Observable.throw(msg);
    }

    getProductsForShop(){

        var shop_id = localStorage.getItem("shop_id");
        var token = localStorage.getItem("id_token");

        console.log("from localstorage");
        console.log("shop "+shop_id);
        console.log("token: "+token);

        var poducts = new Array();

        for(var i=0; i < 15; i ++){

            var prod = new Product();
            prod.name = "Produktnamn";
            prod.description = "Produkttyp "+ (i >= 10 ? ( i - 10) : i);
            prod.quantity = i+1;
            prod.price = ((i+20)/3) * (i % 10 === 0 ? 4 : 10);

            prod.price = Number.parseFloat(prod.price.toFixed(2));

            poducts[i] = prod;
        }

        return poducts;
    }


}