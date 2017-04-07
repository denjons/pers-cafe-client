import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'filter-text',
   templateUrl: './filter-text.component.html'
})
export class FilterTextComponent {
  @Output() onFilterChanged: EventEmitter<string>;

  filter: string;

  constructor() {
    this.onFilterChanged = new EventEmitter<string>();
    this.filter = "";
  }

  clear() {
    this.filter = '';
  }

  filterChanged(event: any) {

    this.filter = event.target.value;
    event.preventDefault();
    console.log(`Filter Changed: ${this.filter}`);
    this.onFilterChanged.emit(this.filter);
  }
}