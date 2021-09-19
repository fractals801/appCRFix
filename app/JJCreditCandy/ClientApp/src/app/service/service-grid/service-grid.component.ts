import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-service-grid',
  templateUrl: './service-grid.component.html',
  styleUrls: ['./service-grid.component.css']
})
export class ServiceGridComponent implements OnInit {
  private gridStuffsServiceAPI:any;
  @Input() inputModel: any;
  @Output() inputModelChange = new EventEmitter<any>();

  public gridStuffsService = {
    gridApi: {},
    gridColumnApi: {},
    defaultColDef: { resizable: true ,filter: true},
    columnDefs: [
      { field: 'id', hide: true },
      { field: 'servicetrandate', sortable: true, headerName: 'Refered Service Date',width:200 },
      { field: 'CustomerName', sortable: true,headerName: 'Customer Name',width:150 },
      { field: 'CustomerLastname', sortable: true, headerName: 'Lastname',width:250 },
      { field: 'email', sortable: true, headerName: 'E-mail',width:250 },
      { field: 'phone1', headerName: 'Phone 1',width:200},
      { field: 'phone2', headerName: 'Phone 2',width:200}],
    rowData: [],
    rowDoubleClicked: (row: any) => {
      this.fillFields(row);
      //let _document=this.inputModel.customerpersonalinfo._elementRef.nativeElement;
      //_document.querySelector("#customername").disabled=true;
   // this.inputModel.customerpersonalinfo.grupo1.disable();
   this.inputModel.grupo1.disable();
   
   if(this.inputModel.grupo1.get("tmpprocesstrandatechk").value===true)
    {
    this.inputModel.grupo1.get("tmpprocesstrandatechk").disable();
    }else{

      this.inputModel.grupo1.get("tmpprocesstrandatechk").enable();
    }

    },
    
  };
  onGridStuffsServiceReady(params) {
    this.gridStuffsServiceAPI = params.api;
    // call ajax with customerid and fill all subgrids
    //this.fillDataSubGrids(this.inputModel.grupo1.get("id").value);
  
  }

  fillFields(row: any) {
    let m = moment(row.data.Dob, 'YYYY/MM/DD');
    let tmpdob = m.isValid() ? m : '';
    m = moment(row.data.refereddate, 'YYYY/MM/DD');
    let tmprefereddate = m.isValid() ? m : '';

    m = moment(row.data.processtrandate, 'YYYY/MM/DD');
    let tmpprocesstrandate = m.isValid() ? m : '';


    let tmpModel: any = {
      customername: row.data.CustomerName,
      customerlastname: row.data.CustomerLastname,
      //dob: m.isValid() ? m.set({'year':2020,'month':1,'date':5}) : '',
      //tmpprocesstrandate si tiene fecha lo convierto tmpservicetrandatechk en true si no false
      tmpprocesstrandatechk: tmpprocesstrandate ==="" ? false:true,
      dob: tmpdob,
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
      id: row.data.id
    };


    if(this.inputModel.grupo1.get("tmpprocesstrandatechk").value===true)
    {
    this.inputModel.grupo1.get("tmpprocesstrandatechk").disable();
    }else{

      this.inputModel.grupo1.get("tmpprocesstrandatechk").enable();
    }

    this.inputModel.grupo1.patchValue(tmpModel);
    this.inputModel.toggleTab();
   
  }
  
  constructor() { 

  }

  ngOnInit(): void {
  }

}
