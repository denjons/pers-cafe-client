import { Injectable } from '@angular/core';

@Injectable()
export class FilterTextService {
  constructor() {
    console.log('Created an instance of FilterTextService');
  }

  filter(value: string, filter : string) {
    if(filter.length > value.length){
        return false;
    }
    return this.filterLvl(value, filter, 0, 0);
  }

  filterLvl(value: string, filter : string, pos : number, i: number){
     
     if(i >= filter.length){
        return true;
     }
     if(pos + i >= value.length){
        return false;
     }
     if(value[pos+i] == filter[i]){
        return this.filterLvl(value, filter, pos, i + 1);
     }else{
         return this.filterLvl(value, filter, pos + 1, 0);
     }
  }

}