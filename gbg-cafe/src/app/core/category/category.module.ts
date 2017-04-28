import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Category } from '../shop/category.model';
import { CategoryEditComponent } from "./edit/category-edit.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule
    ],
    exports:[
        CategoryEditComponent
    ],
    declarations: [CategoryEditComponent],
    providers: []
})
export class CategoryModule{

}