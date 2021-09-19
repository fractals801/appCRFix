import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Icrudmenu } from '../crudmenu/icrudmenu';
import { HttpClient } from '@angular/common/http';
import { ServiceHttpService } from '../servicesApp/service-http.service';
import { GlobalVariables } from '../GlobalVars/gvars';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { ServiceGridComponent } from './service-grid/service-grid.component';
import { CustomerpersonalinfoComponent } from '../customerprofile/customerpersonalinfo/customerpersonalinfo.component';
import { ServicegridtranComponent } from './servicegridtran/servicegridtran.component';
import { DialogsService } from '../servicesApp/dialogs.service';
import { UseraccessService } from '../servicesApp/useraccess.service';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ServiceComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild("xServiceGrid") public xServiceGrid: ServiceGridComponent;
  @ViewChild("xCustomerpersonalinfo", { read: CustomerpersonalinfoComponent }) public customerpersonalinfo: CustomerpersonalinfoComponent;
  @ViewChild("xServicetrangrid") public xServicetrangrid: ServicegridtranComponent;
  @ViewChild("xsnav") private xSnav: SidenavComponent;

  //@ContentChild(CustomerpersonalinfoComponent) customerpersonalinfo: CustomerpersonalinfoComponent;

  public that: any = this;
  public grupo1: FormGroup;
  public grupo1_customerprofile: FormGroup;
  public fd: FormData;
  public states: any;
  public uobjprofile: any;
  public xsection: any = { ready: false };
  public xsection_customerprofile:any={ready:false};
  private subscriptionManager: Subscription[] = [];

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
        tmpprocesstrandatechk: new FormControl(),
        id: new FormControl(-1)
      }


    );
    this.grupo1_customerprofile = this.grupo1;
    //  this.fillDataGrid();
  }


  ngOnDestroy(): void {
    this.subscriptionManager.forEach(item => { item.unsubscribe(); });
    this.uaccess.killSubscriptions();
    this.uaccess = null;
    this.xSnav.killSubscriptions();
    this.xSnav = null;
  }


  ngAfterViewInit(): void {
    setTimeout(() => {
      this.xSnav.getUProfile();
      this.fillDataGrid();
    });
  }

  ngOnInit(): void {

    if (GlobalVariables.ISMOCKUP) {
      this.xsection = JSON.parse('{"s1":{"root":{},"grid":{"disable":false},"ch":{"null":{}}},"s2":{"root":{},"grid":{"disable":false},"ch":{"null":{}}}}');
    } else {
      this.uaccess.setUserAccess("customerinfo", this.grupo1_customerprofile, this.xsection_customerprofile);
      this.uaccess.setUserAccess("serviceinfo", this.grupo1, this.xsection);
    }
  }

  ngAfterContentChecked() {
    // console.log("after content checked")
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

          this.xServicetrangrid.addNewRowGridServicetran();
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

  public crudMethodsServicetran: Icrudmenu = {
    add: () => {
      this.xServicetrangrid.addNewRowGridServicetran();
    },
    delete: () => { }, update: () => { },
    search: () => { }, cancel: () => { },
    save: () => { }, options: "add"
  }

  //**** Here is the full object that contain the whole wiring in the app *******
  public fullObj = {
    defaultObj: this.defaultObj,
    xcrudMethodsServicetran: this.crudMethodsServicetran
  }

  fillDataGrid() {
    //this.gridStuffs.rowData
    setTimeout(() => {
      this.subscriptionManager["getDataServiceSubscription"] = this.ss.xhttp('post', GlobalVariables.WEBAPIPATH + '/service/getDataService', '').
        subscribe(data => {
          //let xdata = JSON.parse(data);
          let xdata = data;
          for (var item in xdata) {
            xdata[item].servicetrandate = moment(xdata[item].servicetrandate).format("MM/DD/YYYY");
          }
          this.xServiceGrid.gridStuffsService.rowData = xdata;
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
    this.xServicetrangrid.gridStuffsServicetranAPI.stopEditing();
    setTimeout(() => {
      this.fd = new FormData();
      this.fd.append("id", this.grupo1.get("id").value);
      this.fd.append("tmpprocesstrandatechk", this.grupo1.get("tmpprocesstrandatechk").value);
      // gridservice -------------------
      let rowData = [];
      this.xServicetrangrid.gridStuffsServicetranAPI.forEachNode(node => rowData.push(node.data));
      this.fd.append("gridservice", JSON.stringify(rowData));
      //-------------------------------

      // update and insert
      this.subscriptionManager["setDataServiceSubscription"] = this.ss.xhttp('post', GlobalVariables.WEBAPIPATH + '/service/setData', this.fd).pipe(
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


}
