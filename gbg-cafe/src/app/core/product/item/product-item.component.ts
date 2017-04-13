import { Component, OnInit, Input ,Output, EventEmitter } from '@angular/core';
import { Product } from '../product.model';
import { User } from '../../shop/user.model';
import { ImgService } from '../../../shared/img/img.service';


@Component({
    selector: "product-item",
    templateUrl: "./product-item.component.html",
    styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit{

    @Input() product: Product;
    @Input() user: User;
    @Input() defaultImg: string;
    imgSrc : String;

    @Output() onAddToCart = new EventEmitter;
    @Output() onEdit = new EventEmitter;

    price: string;
    price2: string;

    constructor(private imgService : ImgService){
        
    }


    ngOnInit(){
        var priceArr = this.product.price.toFixed(2).toString().split(".");
        this.price = priceArr[0];
        if(priceArr.length > 1){
            this.price2 = priceArr[1];
        }else{
            this.price2 = ".00";
        }
    }

    edit(){
        this.onEdit.emit(this.product);
        return false;
    }

    addToCart(){
        if(this.product.quantity > 0){
            this.onAddToCart.emit(this.product);
        }else{
            console.log("Todo: product quantity is "+ this.product.quantity+", notify user");
        }
        
    }


}