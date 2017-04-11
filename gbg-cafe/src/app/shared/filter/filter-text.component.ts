import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'filter-text',
   templateUrl: './filter-text.component.html'
})
export class FilterTextComponent {
  @Output() onFilterChanged: EventEmitter<string>;

  filter: string;
  elm: any;

  constructor() {
    this.onFilterChanged = new EventEmitter<string>();
    this.filter = "";
  }

  clear() {
    this.filter = '';
    if(this.elm != null){
      this.elm.value = "";
    }
  }

  filterChanged(event: any) {
    this.elm = event.target;
    this.filter = event.target.value;
    event.preventDefault();
    console.log(`Filter Changed: ${this.filter}`);
    this.onFilterChanged.emit(this.filter);
  }
}