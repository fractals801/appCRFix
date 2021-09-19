import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-pscore',
  templateUrl: './pscore.component.html',
  styleUrls: ['./pscore.component.css']
})
export class PscoreComponent implements OnInit {


  // public gridStuffs = {
  //   gridApi: {},
  //   gridColumnApi: {},
  //   defaultColDef: { resizable: true },
  //   columnDefs: [
  //     { field: 'id', hide: true },
  //     { field: 'entrydate', sortable: true,headerName: '',width:115 },
  //     { field: 'equifaxpoints', sortable: true, headerName: 'Equifax',width:125},
  //     { field: 'experianpoints', sortable: true, headerName: 'Experian',width:125 },
  //     { field: 'transunionpoints', sortable: true, headerName: 'Trans Union',width:145}    
  //   ],
  //   rowData: [],
  //   rowDoubleClicked: (row: any) => {
  //   //  this.fillFields(row)
  //   }
  // };
  
  
  // onGridReady(params) {
  //   //params.columnApi.autoSizeAllColumns();
  //   this.gridStuffs.gridApi = params.api;
  // }

  
public  ELEMENT_DATA: PeriodicElement[] = [
    {position: 1,entrydate:'07/12/2021', equifaxpoints: 234, experianpoints: 600, transunionpoints: 400},
    {position: 2,entrydate:'07/12/2021', equifaxpoints: 101, experianpoints: 300, transunionpoints: 700},
    {position: 3, entrydate:'07/12/2021',equifaxpoints: 234, experianpoints: 600, transunionpoints: 400},
    {position: 4,entrydate:'07/12/2021', equifaxpoints: 233, experianpoints: 600, transunionpoints: 400},
    {position: 5,entrydate:'07/12/2021', equifaxpoints: 235, experianpoints: 600, transunionpoints: 400},
    {position: 6,entrydate:'07/12/2021', equifaxpoints: 167, experianpoints: 300, transunionpoints: 700},
    {position: 7, entrydate:'07/12/2021',equifaxpoints: 235, experianpoints: 600, transunionpoints: 400},
   
  ];

  displayedColumns: string[] = ['position', 'entrydate', 'equifax', 'experian','transunion'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor() {
 
  }

  ngOnInit(): void {
  }
  
   
  highlight(row,evt) :void{
    //console.log(row,evt);
    alert(row.equifaxpoints+'');
 }
  
  public add(){
    //alert('fdsafdsafdsa');
    this.ELEMENT_DATA.push({position: 8, entrydate:'07/12/2021',equifaxpoints: 234, experianpoints: 777, transunionpoints: 400});
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
   
    return false;
  }


}


export interface PeriodicElement {
  position: number;
  entrydate:string;
  equifaxpoints: number;
  experianpoints: number;
  transunionpoints: number;
}




