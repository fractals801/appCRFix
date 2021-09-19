import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pdispute',
  templateUrl: './pdispute.component.html',
  styleUrls: ['./pdispute.component.css']
})
export class PdisputeComponent implements OnInit {

  displayedColumns: string[] = ['position', 'entrydate', 'equifax', 'experian','transunion'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor() {
 
  }

  ngOnInit(): void {
  }

}


export interface PeriodicElement {
  position: number;
  entrydate:string;
  equifaxpoints: number;
  experianpoints: number;
  transunionpoints: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1,entrydate:'07/12/2021', equifaxpoints: 234, experianpoints: 600, transunionpoints: 400},
  {position: 2,entrydate:'07/12/2021', equifaxpoints: 100, experianpoints: 300, transunionpoints: 700},
  {position: 3, entrydate:'07/12/2021',equifaxpoints: 234, experianpoints: 600, transunionpoints: 400},
  {position: 4,entrydate:'07/12/2021', equifaxpoints: 234, experianpoints: 600, transunionpoints: 400},
  ];