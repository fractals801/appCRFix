import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-ciagrid',
  templateUrl: './ciagrid.component.html',
  styleUrls: ['./ciagrid.component.css']
})
export class CiagridComponent implements OnInit {

  @Input() inputModel: any;
  @Output() inputModelChange = new EventEmitter<any>();

  public gridStuffs = {
    gridApi: {},
    gridColumnApi: {},
    defaultColDef: { resizable: true,filter: true },
    columnDefs: [
      { field: 'id', hide: true },
      { field: 'CompanyName', sortable: true,headerName: 'Company Name',width:200 },
      { field: 'ContactName', sortable: true, headerName: 'Contact Name',width:220 },
      { field: 'ContactLastname', sortable: true, headerName: 'Contact Lastname',width:250 },
      { field: 'email', sortable: true, headerName: 'E-mail',width:250 },
      { field: 'phone1', headerName: 'Phone 1',width:200},
      { field: 'phone2', headerName: 'Phone 2',width:200},
    
      { field: 'Addr1', hide: true, headerName: 'Address 1',width:200},
      { field: 'Addr2',hide: true, headerName: 'Address 2',width:200},
      { field: 'contry',hide: true, headerName: 'Contry',width:200},
      { field: 'city',hide: true, headerName: 'City',width:200},
      { field: 'zipcode',hide: true, headerName: 'ZipCode',width:200},
      { field: 'state',hide: true, headerName: 'State',width:200},
      { field: 'Addr1_Mail',hide: true, headerName: 'Mail Address 1',width:200},
      { field: 'Addr2_Mail',hide: true, headerName: 'Mail Address 2',width:200},
      { field: 'contry_Mail',hide: true, headerName: 'Mail Contry',width:200},
      { field: 'city_Mail', hide: true,headerName: 'Mail City',width:200},
      { field: 'zipcode_Mail',hide: true, headerName: 'Mail ZipCode',width:200},
      { field: 'state_Mail', hide: true,headerName: 'Mail State',width:200}
    ],
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
      companyname: row.data.CompanyName,
      contactname: row.data.ContactName,
      contactlastname: row.data.ContactLastname,
      email: row.data.email,
      phone1: row.data.phone1,
      phone2: row.data.phone2,
      addr1: row.data.Addr1,
      addr2: row.data.Addr2,
      country: row.data.country,
      city: row.data.city,
      zipcode: row.data.zipcode,
      state: row.data.state,
      address1_mail: row.data.Addr1_Mail,
      address2_mail: row.data.Addr2_Mail,
      country_mail: row.data.contry_Mail,
      city_mail: row.data.city_Mail,
      zipcode_mail: row.data.zipcode_Mail,
      state_mail: row.data.state_Mail,
      id: row.data.id
    };
    this.inputModel.grupo1.patchValue(tmpModel);
    this.inputModel.toggleTab(); 

  }

  constructor() { }

  ngOnInit(): void {
  }

}
