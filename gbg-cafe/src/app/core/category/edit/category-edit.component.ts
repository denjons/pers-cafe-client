import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from "../../shop/category.model";


@Component({
    selector: "category-edit",
    templateUrl: "category-edit.component.html",
    styles: [] 

})
export class CategoryEditComponent implements OnInit{

    @Input() categories: Category [];

    @Output() onAdd = new EventEmitter;
    @Output() onRemove = new EventEmitter;
    @Output() onUpdate = new EventEmitter;

    ngOnInit(){
        
    }
}