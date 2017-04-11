import { Component, OnInit, Input ,Output, EventEmitter } from '@angular/core';
import { Product } from '../core/product/product.model';
import { User } from '../core/shop/user.model';
import { CartItem } from '../core/cart/cart-item.model';


@Component({
    selector: "reciept",
    templateUrl: "./reciept.component.html"
})
export class RecieptItemComponent implements OnInit{

    @Input() items: CartItem[];
    @Output() onClose = new EventEmitter;
    total: number;

    ngOnInit(){
        console.log("init reciept");
        console.log(this.items.length);
        var total = 0;
        this.items.forEach(i=> {total = total + i.quantity * i.product.price; console.log(total)});
        this.total = total;
    }

    close(){
        this.onClose.emit(this.items);
    }


}