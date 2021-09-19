import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
//import { GridApi, RowNode } from 'ag-grid-community';
import * as moment from 'moment';
@Component({
  selector: 'app-customergrid',
  templateUrl: './customergrid.component.html',
  styleUrls: ['./customergrid.component.css']
})
export class CustomergridComponent implements OnInit {
  @Input() inputModel: any;
  @Output() inputModelChange = new EventEmitter<any>();

  public gridStuffs = {
    gridApi: {},
    gridColumnApi: {},
    defaultColDef: { resizable: true,filter: true },
    columnDefs: [
      { field: 'id', hide: true },
      { field: 'currentscore', hide: true },
      { field: 'scoreprojection', hide: true },
      { field: 'CustomerName', sortable: true,headerName: 'Customer Name',width:200 },
      { field: 'CustomerLastname', sortable: true, headerName: 'Lastname',width:250 },
      { field: 'email', sortable: true, headerName: 'E-mail',width:300 },
      { field: 'phone1', headerName: 'Phone 1',width:200},
      { field: 'phone2', headerName: 'Phone 2',width:200}],
    rowData: [],
    rowDoubleClicked: (row: any) => {
      this.fillFields(row)
    },
    onGridReady(params) {
      //params.columnApi.autoSizeAllColumns();
      
    }
  };

  fillFields(row: any) {
    let m = moment(row.data.Dob, 'YYYY/MM/DD');
    let tmpdob = m.isValid() ? m : '';
    m = moment(row.data.refereddate, 'YYYY/MM/DD');
    let tmprefereddate = m.isValid() ? m : '';

    m = moment(row.data.servicetrandate, 'YYYY/MM/DD');
    let tmpservicetrandate = m.isValid() ? m : '';


    
    let tmpModel: any = {
      customername: row.data.CustomerName,
      customerlastname: row.data.CustomerLastname,
      //dob: m.isValid() ? m.set({'year':2020,'month':1,'date':5}) : '',
      dob: tmpdob,
      //tmpservicetrandate si tiene fecha lo convierto tmpservicetrandatechk en true si no false
      tmpservicetrandatechk: tmpservicetrandate ==="" ? false:true,
      refereddate: tmprefereddate,
      email: row.data.email,
      state: row.data.state,
      phone1: row.data.phone1,
      phone2: row.data.phone2,
      address1: row.data.Address1,
      address2: row.data.Address2,
      country: row.data.contry,
      city: row.data.city,
      zipcode: row.data.zipcode,
      currentscore:row.data.currentscore,
      scoreprojection: row.data.scoreprojection,
      id:row.data.id
    };
    this.inputModel.grupo1_customerprofile.patchValue(tmpModel);
    
    if(this.inputModel.grupo1_customerprofile.get("tmpservicetrandatechk").value===true)
    {
    this.inputModel.grupo1_customerprofile.get("tmpservicetrandatechk").disable();
    }else{

      this.inputModel.grupo1_customerprofile.get("tmpservicetrandatechk").enable();
    }
    this.inputModel.toggleTab(); 
  }

  constructor() { }
  
  ngOnInit(): void { }

}
