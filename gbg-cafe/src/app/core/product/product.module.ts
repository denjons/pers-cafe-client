import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ProductService } from './product.service';
import { ProductItemComponent } from './item/Product-item.component';
import { ProductEditComponent } from "./edit/product-edit.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule
    ],
    exports:[
        ProductItemComponent, ProductEditComponent
    ],
    declarations: [ProductItemComponent, ProductEditComponent],
    providers: [ProductService]
})
export class ProductModule{

}