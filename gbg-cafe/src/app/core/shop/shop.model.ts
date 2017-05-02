import { Category } from './category.model';
import { SalesTax } from "./sales-tax.model";

export class Shop{
    id:number;
    name : string;
    description : string;
    categories : Category[]; 
    salesTaxes : SalesTax[];
}