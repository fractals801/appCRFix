import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Icrudmenu } from '../crudmenu/icrudmenu';
import { HttpClient } from '@angular/common/http';
import { ServiceHttpService } from '../servicesApp/service-http.service';
import { GlobalVariables } from '../GlobalVars/gvars';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { ProcessGridComponent } from './process-grid/process-grid.component';
import { CustomerpersonalinfoComponent } from '../customerprofile/customerpersonalinfo/customerpersonalinfo.component';
import { ProcessgridtranComponent } from './processgridtran/processgridtran.component';
import { DialogsService } from '../servicesApp/dialogs.service';
import { UseraccessService } from '../servicesApp/useraccess.service';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-process',
  templateUrl: './processdepart.component.html',
  styleUrls: ['./processdepart.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProcessdepartComponent implements OnInit, AfterViewInit,OnDestroy {

  @ViewChild("xProcessGrid") public xProcessGrid: ProcessGridComponent;
  @ViewChild("xCustomerpersonalinfo", { read: CustomerpersonalinfoComponent }) public customerpersonalinfo: CustomerpersonalinfoComponent;
  @ViewChild("xProcesstrangrid") public xProcesstrangrid: ProcessgridtranComponent;
  @ViewChild("xsnav") private xSnav: SidenavComponent;

  public that: any = this;
  public grupo1: FormGroup;
  public fd: FormData;
  public states: any;
  public uobjprofile: any;
  public xsection: any = {};
  private subscriptionManager:Subscription[]=[];

  constructor(private fb: FormBuilder, private http: HttpClient,
    private ss: ServiceHttpService,
    public dialog1: DialogsService, public uaccess: UseraccessService) {

    this.grupo1 = this.fb.group(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        customername: new FormControl('', [Validators.required]),
        customerlastname: new FormControl('', [Validators.required]),
        dob: new FormControl(),
        refereddate: new FormControl(),
        phone1: new FormControl(''),
        phone2: new FormControl(''),
        state: new FormControl(''),
        zipcode: new FormControl(''),
        address1: new FormControl(''),
        address2: new FormControl(''),
        country: new FormControl(''),
        city: new FormControl(''),
        id: new FormControl(-1)
      }
    );
    //  this.fillDataGrid();
  }
 


  toggleTab() {
    this.fullObj.defaultObj.showtab2 ? this.fullObj.defaultObj.showtab2 = false :
      this.fullObj.defaultObj.showtab2 = true
  }

  public defaultObj: any =
    {
      options2: {},
      hideRequiredControl: {},
      floatLabelControl: {},
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
      xcrudMethodsSaveCancel: {
        add: () => {

          this.xProcesstrangrid.addNewRowGridProcesstran();
        },
        delete: () => { }, update: () => { },
        search: () => { },
        cancel: () => {
          this.toggleTab();
          this.fillDataGrid();
        },
        save: () => { this.csave(); }
        , options: "save,cancel"
      }

    }

  public crudMethodsProcesstran: Icrudmenu = {
    add: () => {
      this.xProcesstrangrid.addNewRowGridProcesstran();
    },
    delete: () => { }, update: () => { },
    search: () => { }, cancel: () => { },
    save: () => { }, options: "add"
  }

  //**** Here is the full object that contain the whole wiring in the app *******
  public fullObj = {
    defaultObj: this.defaultObj,
    xcrudMethodsProcesstran: this.crudMethodsProcesstran
  }

  fillDataGrid() {
    //this.gridStuffs.rowData

    setTimeout(() => {
    this.subscriptionManager["DataGridSubscription"] = this.ss.xhttp('post', GlobalVariables.WEBAPIPATH + '/process/getDataProcess', '').
        pipe(map(response => response)

          // ,
          // catchError(error => {
          //   alert('3');
          //   return throwError("Esto se jodio")
          // })
        )
        .subscribe(data => {
          //let xdata = JSON.parse(data);
          let xdata = data;
          for (var item in xdata) {

            xdata[item].servicetrandate = moment(xdata[item].servicetrandate).format("MM/DD/YYYY");
          }

          this.gridStuffsProcess.rowData = xdata;

        },
          err => {
            if (err.status == "401" || err.status == "400") {
              this.dialog1.diag1("Access Denied", "Warning!!!");
            } else {
              this.dialog1.diag1(err.error.text ? err.error.text : err.message, "Warning!!!");
            }
          }
        );
    });
  }

  csave() {
    //    alert(this.defaultObj.frmModel.email.value);
    this.xProcesstrangrid.gridStuffsProcesstranAPI.stopEditing();
    setTimeout(() => {
      this.fd = new FormData();
      this.fd.append("id", this.grupo1.get("id").value);
      // gridservice -------------------
      let rowData = [];
      this.xProcesstrangrid.gridStuffsProcesstranAPI.forEachNode(node => rowData.push(node.data));
      this.fd.append("gridprocess", JSON.stringify(rowData));
      //-------------------------------

      // update and insert
      this.subscriptionManager["SetDataSubscription"]= this.ss.xhttp('post', GlobalVariables.WEBAPIPATH + '/process/setData', this.fd).pipe(
      )
        .subscribe(data => {

          this.fillDataGrid();
          this.toggleTab();
        },
          err => {
            if (err.status == "401" || err.status == "400") {
              this.dialog1.diag1("Access Denied", "Warning!!!");
            } else {
              this.dialog1.diag1(err.error.text ? err.error.text : err.message, "Warning!!!");
            }
          }
        );
    }, 500); // wait until other components FINISH.
  }

  //----------------- Process grid data ---------------------------------
  private gridStuffsProcessAPI: any;
  public gridStuffsProcess = {
    gridApi: {},
    gridColumnApi: {},
    defaultColDef: { resizable: true, filter: true },
    columnDefs: [
      { field: 'id', hide: true },
      { field: 'servicetrandate', sortable: true, headerName: 'Refered Service Date', width: 200 },
      { field: 'CustomerName', sortable: true, headerName: 'Customer Name', width: 150 },
      { field: 'CustomerLastname', sortable: true, headerName: 'Lastname', width: 250 },
      { field: 'email', sortable: true, headerName: 'E-mail', width: 250 },
      { field: 'phone1', headerName: 'Phone 1', width: 200 },
      { field: 'phone2', headerName: 'Phone 2', width: 200 }],
    rowData: [],
    rowDoubleClicked: (row: any) => {

      this.fillFields(row);
      this.grupo1.disable();
    },

  };
  onGridStuffsProcessReady(params) {
    this.gridStuffsProcessAPI = params.api;
  }

  fillFields(row: any) {
    let m = moment(row.data.Dob, 'YYYY/MM/DD');
    let tmpdob = m.isValid() ? m : '';
    m = moment(row.data.refereddate, 'YYYY/MM/DD');
    let tmprefereddate = m.isValid() ? m : '';
    let tmpModel: any = {
      customername: row.data.CustomerName,
      customerlastname: row.data.CustomerLastname,
      //dob: m.isValid() ? m.set({'year':2020,'month':1,'date':5}) : '',
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

    this.grupo1.patchValue(tmpModel);
    this.toggleTab();

  }
  //---------------------------------------------------------------------
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.xSnav.getUProfile();
      this.fillDataGrid();
    });
  }

  ngOnInit(): void {
    if (!GlobalVariables.ISMOCKUP) {
      this.uaccess.setUserAccess("processdepart", this.grupo1, this.xsection);
    } else {
      this.xsection = JSON.parse('{"s1":{"root":{},"grid":{"disable":false},"ch":{"null":{}}},"s2":{"root":{},"grid":{"disable":false},"ch":{"null":{}}}}');
    }
  }

  ngAfterContentChecked() {
    // console.log("after content checked")
  }

  ngOnDestroy(): void {
    this.subscriptionManager.forEach(item=>{item.unsubscribe();});
    this.uaccess.killSubscriptions();
    this.uaccess=null;
    this.xSnav.killSubscriptions();
    this.xSnav=null;
    }

}
