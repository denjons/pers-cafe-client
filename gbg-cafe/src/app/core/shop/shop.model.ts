import { Category } from './category.model';

export class Shop{
    id:number;
    name : string;
    description : string;
    categories : Category[]; 
}