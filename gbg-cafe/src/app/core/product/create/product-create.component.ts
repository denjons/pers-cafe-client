import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { Category } from "../../shop/category.model";


@Component({
    selector: "product-create",
    templateUrl: "product-create.component.html",
    styles: [] 
})
export class ProductCreateComponent implements OnInit{

    product: Product;
    @Input() category: Category;
    @Output() onCreateSave = new EventEmitter;
    @Output() onClose = new EventEmitter;


    constructor(private productService: ProductService){

    }

    ngOnInit(){
        this.initProduct();
        console.log("init product create.");
    }

    initProduct(){
        this.product = new Product()
        this.product.active = true;
        this.product.category = this.category;
        this.product.category_id = this.category.id;
    }

    createSave(){
        console.log("onCreateSave");
        this.onCreateSave.emit(this.product);
    }

    clear(){
        this.initProduct();
    }

    close(){
        console.log("onClose");
        this.onClose.emit();
    }
}