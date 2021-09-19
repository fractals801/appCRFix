import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-usergrid',
  templateUrl: './usergrid.component.html',
  styleUrls: ['./usergrid.component.css']
})
export class UsergridComponent implements OnInit {


  @Input() inputModel: any;
  @Output() inputModelChange = new EventEmitter<any>();

  public gridStuffs = {
    gridApi: {},
    gridColumnApi: {},
    defaultColDef: { resizable: true,filter: true },
    columnDefs: [
      { field: 'id', hide: true },
      { field: 'fullname', sortable: true,headerName: 'Full Name',width:200 },
      { field: 'uname', sortable: true, headerName: 'User Name',width:250 },
      { field: 'useremail', sortable: true, headerName: 'E-mail',width:300 }],
    rowData: [],
    rowDoubleClicked: (row: any) => {
      this.inputModel.fillFields(row)
    },
    onGridReady(params) {
      //params.columnApi.autoSizeAllColumns();
    }
  };

  


  constructor() { }

  ngOnInit(): void {
  }

}
