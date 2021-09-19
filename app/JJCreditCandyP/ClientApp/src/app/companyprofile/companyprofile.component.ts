
import { AfterContentInit, AfterViewInit, Component, ElementRef, Inject, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { IModel1 } from '../imodels/imodel1';
//import { forkJoin, Subject } from 'rxjs';
//import { debounceTime, takeUntil } from 'rxjs/operators';
import { Icrudmenu } from '../crudmenu/icrudmenu';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceHttpService } from '../servicesApp/service-http.service';
import { statesData } from '../GlobalVars/staticInfo/StatesData';
import * as moment from 'moment';
import { GlobalVariables, GlobalVariables2 } from '../GlobalVars/gvars';
import { CiagridComponent } from './ciagrid/ciagrid.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { DialogsService } from '../servicesApp/dialogs.service';
import { UseraccessService } from '../servicesApp/useraccess.service';
import { ServicegeneralService } from '../servicesApp/servicegeneral.service';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';



@Component({
  selector: 'app-companyprofile',
  templateUrl: './companyprofile.component.html',
  styleUrls: ['./companyprofile.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class CompanyprofileComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentInit {

  public that: any = this;
  public grupo1_companyprofile: FormGroup;
  public uobjprofile: any;
  public filterSearchCriteria: string;
  public xsection_companyprofile: any = {ready:false};
  private subscriptionManager: Subscription[] = [];
 // public ya: any = {display:'none'};

  // here its must be the final model to send
  public fd: FormData = new FormData();
  states: any;

  @ViewChild("frm") private frm: NgForm;
  @ViewChild("frmobj") public frmobj: ElementRef;
  @ViewChild("xCiagrid") public xCiagrid: CiagridComponent;
  @ViewChild("xsnav") private xSnav: SidenavComponent;



//----------------- cia profile grid
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
  this.grupo1_companyprofile.patchValue(tmpModel);
  this.toggleTab(); 

}
//-------------------


  constructor(private fb: FormBuilder, private http: HttpClient,
    private ss: ServiceHttpService, private xrouter: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    public tmprouter: Router, public dialog1: DialogsService,
    public uaccess: UseraccessService, private gs: ServicegeneralService

  ) {


    // GlobalVariables2.TOKEN= document.querySelector("#twj")["value"];

  }
  ngAfterContentInit(): void {

  }

  // ejecuta despues q todos los componente estan arriba
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.xSnav.getUProfile();
    this.fillDataGrid();
    });
  }



  fillDataGrid() {

    setTimeout(() => {
      this.subscriptionManager["CompanyprofileSubscription"] = this.ss.xhttp('post', GlobalVariables.WEBAPIPATH + '/Companyprofile/getData', "").
      pipe(
        //delay(2000)
        )  
      .subscribe(data => {
          // console.log(data);
          ///this.gridStuffs.rowData = JSON.parse(data);
        
          this.gridStuffs.rowData = data;
         // this.ya={display:''};
        },
          err => { //alert('Datagrid'); 
            if (err.status == "401" || err.status == "400") {
              this.dialog1.diag1("Access Denied", "Warning!!!");

            } else {
              this.dialog1.diag1(err.error.text ? err.error.text : err.message, "Warning!!!");
            }
            return false;
          }
        );
    });
  }


  fillDataGridSearch(criteria: string) {
    this.fd = new FormData();
    this.fd.append("filtersearch", criteria);
    this.subscriptionManager["CompanyprofileSearchSubscription"] = this.ss.xhttp('post', GlobalVariables.WEBAPIPATH + '/Companyprofile/getDataSearch', this.fd).
      subscribe(data => {
        // console.log(data);
        ///this.gridStuffs.rowData = JSON.parse(data);
        this.gridStuffs.rowData = data;
      },
        err => { //alert('Datagrid'); 
          if (err.status == "401" || err.status == "400") {
            this.dialog1.diag1("Access Denied", "Warning!!!");

          } else {
            this.dialog1.diag1(err.error.text ? err.error.text : err.message, "Warning!!!");
          }
          return false;
        }
      )
  }



  //*************** Here goes the menu button logic ***************

  private crudMethods2: Icrudmenu = {
    add: (that) => {
      //alert(that.frmModel.companyname);
      //alert(this.fullObj.defaultObj.frmModel.companyname);
      alert('add');
    },
    delete: (that) => { alert('delete'); },
    update: (that) => { alert('update'); },
    search: (that) => { alert('search'); },
    cancel: (that) => {
      this.frm.resetForm();
      this.toggleTab();
      this.fillDataGrid();
    },
    save: (that) => {

      if (this.fullObj.xvalid()) {
        this.csave();
      } else {
        this.dialog1.diag1("Missing information to complete.", "Warning!!!");
      }

    },
    options: "save,cancel"
  }


  private crudMethods1: Icrudmenu = {
    add: () => {
      //alert(that.frmModel.companyname);
      let tmpModel: any = { id: -1 };
      this.grupo1_companyprofile.patchValue(tmpModel);
      this.toggleTab();
    },
    delete: () => { }, update: () => { },
    search: () => { }
    , cancel: () => { },
    save: () => { }, options: "add"
  }



  toggleTab() {
    this.fullObj.defaultObj.showtab2 ? this.fullObj.defaultObj.showtab2 = false :
      this.fullObj.defaultObj.showtab2 = true
  }

  csave() {
    this.fd = new FormData();
    for (var item in this.grupo1_companyprofile.controls) {
      if (item !== "searchfiltercriteria") {
        if (this.grupo1_companyprofile.get(item).value) {
          if (this.grupo1_companyprofile.get(item).value._i) {
            let tdate = moment(this.grupo1_companyprofile.get(item).value).format('MM/DD/YYYY HH:mm');
            // let today = moment().format('MM/DD/YYYY HH:mm');
            // datepicker value
            this.fd.append(item, tdate);
          } else {
            this.fd.append(item, this.grupo1_companyprofile.get(item).value);
          }
        }
      }
    }
    this.fd.append("lockbyuser", this.uobjprofile.uname);

    // update and insert
    this.subscriptionManager["CompanyprofileSetData"] = this.ss.xhttp('post', GlobalVariables.WEBAPIPATH + '/Companyprofile/setData', this.fd).pipe(
    )
      .subscribe(data => {
        this.frm.resetForm();
        this.toggleTab();
        this.fillDataGrid();
        if (data.result) {
          if (data.result.includes("Fail")) {
            this.dialog1.diag1(data.result, "Warning!!!");
          }
        }
      },
        err => {
          if (err.status == "401" || err.status == "400") {
            this.dialog1.diag1("Access Denied", "Warning!!!");
          } else {
            this.dialog1.diag1(err.error.text ? err.error.text : err.message, "Warning!!!");
          }
        }
      );



  }

  getUpFileSalida(event) {
    this.fd = event;
  }

  public filterSearch() {

    //alert(this.grupo1_companyprofile.get("searchfiltercriteria").value);
    this.fillDataGridSearch(this.grupo1_companyprofile.get("searchfiltercriteria").value);


  }

  public defaultObj: IModel1 = {
    options2: FormGroup,
    hideRequiredControl: new FormControl(false),
    floatLabelControl: new FormControl('auto'),
    showtab2: false,
    frmModel: {},
    getErrorMessage: (that) => {
      let varname = Object.keys(that.errors)[0]
      if (that.hasError('required')) {
        return 'You must enter a value';
      }
      if (varname === "email") {
        return that.hasError(varname) ? 'Not a valid email' : '';
      }
      return "Something wrong with " + varname;
    },
    xcrudMethods: this.crudMethods1,
  };


  //**** Here is the full object that contain the whole wiring in the app *******
  public fullObj = {
    defaultObj: this.defaultObj,
    xcrudMethods2: this.crudMethods2,
    xvalid: () => {
      let result: boolean = false;

      if (this.grupo1_companyprofile.valid) {
        result = true;
      }
      return result;
    }
  }


  ngOnInit(): void {


    this.grupo1_companyprofile = this.fb.group({
      companyname: new FormControl('', [Validators.required]),
      contactname: new FormControl(),
      contactlastname: new FormControl(),
      email: new FormControl('', [Validators.email, Validators.required]),
      phone1: new FormControl(),
      phone2: new FormControl(),
      addr1: new FormControl(),
      addr2: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      zipcode: new FormControl(),
      country: new FormControl(),
      searchfiltercriteria: new FormControl(),
      id: new FormControl()
    });

    this.states = statesData;
    // get data fields access, here I  set the screen name
    this.uaccess.setUserAccess("companyinfo", this.grupo1_companyprofile, this.xsection_companyprofile);


  }




  public tst() {
    // disable o enable security

    // para hacer disable de toda la seccion
    // itero.


    // Hide --------------------------------------------------
    //*** para esconder toda la seccion
    //  this.uaccess.hideSection(this.xsection.s1);

    // hide a field
    //  this.uaccess.hideField(this.xsection.s1,"companyname");
    // -----------------------------------------


    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    //  disable all field in the section
    //    this.uaccess.disableSection(this.grupo1_companyprofile,this.xsection.s1.ch);


    //---------  Disable only one field, aqui no importa el grupo
    //this.uaccess.disableField(this.grupo1_companyprofile,"companyname");
    //---------

    //  disable todos los campos no importa la seccion.
    //this.grupo1_companyprofile.disable();



  }

  ngOnDestroy(): void {
    this.subscriptionManager.forEach(item => { item.unsubscribe(); });
    this.uaccess.killSubscriptions();
    this.uaccess = null;
    this.xSnav.killSubscriptions();
    this.xSnav = null;
  }
}
