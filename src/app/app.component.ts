import { Component, HostListener, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular/public-api';
import { ColDef, GridOptions } from 'ag-grid-community'; // Column Definition Type Interface

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('myGrid') myGrid!: AgGridAngular;
  @HostListener('document:click', ['$event'])
  onOutsideClick(event: MouseEvent) {
    if(this.hideTableColumnChooser) {
      return;
    }
    const list = document.querySelector('.column-list');
    if(!list || !list.contains(event.target as Node)) {
      this.hideTableColumnChooser = true;
    }
  }
  
  title = 'ag-grid-column-chooser';
  hideTableColumnChooser = true;
  gridOptions: GridOptions = {
    pagination: true
  }

    // Row Data: The data to be displayed.
    rowData = [
      { make: "Tesla", model: "Model Y", price: 64950, electric: true, power: '240bhp', capacity: '5KW', transmission: 'manual', drive: 'front', seating: 8, fuel: 'electric', mileage: '240kms range' },
      { make: "Ford", model: "F-Series", price: 33850, electric: false, power: '140bhp', capacity: '2.5L', transmission: 'automatic', drive: '4wd', seating: 5, fuel: 'diesel', mileage: '25kmpl' },
      { make: "Toyota", model: "Corolla", price: 29600, electric: false, power: '180bhp', capacity: '1.2L', transmission: 'manual', drive: 'rear', seating: 6, fuel: 'petrol', mileage: '18kmpl' },
    ];
  
    // Column Definitions: Defines & controls grid columns.
    colDefs: ColDef[] = [
      { field: "make", colId: 'make' },
      { field: "model", colId: 'model' },
      { field: "price", colId: 'price' },
      { field: "electric", colId: 'electric' },
      { field: "power", colId: 'power' },
      { field: "engine capacity", colId: 'engine' },
      { field: "transmission", colId: 'transmission' },
      { field: "drive", colId: 'drive' },
      { field: "seating", colId: 'seating' },
      { field: "fuel", colId: 'fuel' },
      { field: "mileage", colId: 'mileage' },
    ];

    changeVisibility(event: Event) {
      console.log(event);
      event.stopPropagation();
      this.hideTableColumnChooser = !this.hideTableColumnChooser;
    }

    checkedStateChanged(column: any) {
      console.log(column);
      this.myGrid.api.setColumnVisible(column.colId, !this.myGrid.api.getColumn(column.colId)?.isVisible())
    }
}
