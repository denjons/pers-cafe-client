import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { Category } from "../../shop/category.model";


@Component({
    selector: "product-edit",
    templateUrl: "product-edit.component.html",
    styles: [] 

})
export class ProductEditComponent implements OnInit{

    @Input() product: Product;
    @Input() categories: Category[];
    @Output() onEditSave = new EventEmitter;

    constructor(private productService: ProductService){

    }
    ngOnInit(){
        console.log("init product edit item.");
    }

    editSave(){
        this.onEditSave.emit(this.product);
    }


}