import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pdocument',
  templateUrl: './pdocument.component.html',
  styleUrls: ['./pdocument.component.css']
})
export class PdocumentComponent implements OnInit {

  displayedColumns: string[] = ['position', 'doctxt','col3'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor() {
 
  }

  selection = new SelectionModel<PeriodicElement>(true, []);
  
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  ngOnInit(): void {
  }

}


export interface PeriodicElement {
  position: number;
  doctxt:string;
  col3:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1,doctxt:'Identification ID',col3:''},
  {position: 1,doctxt:'Document 2',col3:''},
  {position: 1,doctxt:'Document 3',col3:''},
  {position: 1,doctxt:'Document 4',col3:''},
   
 
];