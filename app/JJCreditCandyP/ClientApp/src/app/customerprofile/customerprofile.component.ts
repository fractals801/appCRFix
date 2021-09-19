import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { IModel1 } from '../imodels/imodel1';
import { Icrudmenu } from '../crudmenu/icrudmenu';
import { CustomerService } from '../service/customer/customer.service';
import * as moment from 'moment';
import { MatAccordion } from '@angular/material/expansion';
import { CustomergridComponent } from './customergrid/customergrid.component';
import { FollowsgridComponent } from './followsgrid/followsgrid.component';
import { DialogsService } from '../servicesApp/dialogs.service';
import { UseraccessService } from '../servicesApp/useraccess.service';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { GlobalVariables } from '../GlobalVars/gvars';
import { Subscription } from 'rxjs';
//import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-customerprofile',
  templateUrl: './customerprofile.component.html',
  styleUrls: ['./customerprofile.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CustomerprofileComponent implements OnInit, OnDestroy,AfterViewInit {

  @ViewChild("frm") private frm: NgForm;
  @ViewChild("xCustomergrid") private xCustomergrid: CustomergridComponent;
  @ViewChild("xFollowsgrid") private xFollowsgrid: FollowsgridComponent;
  @ViewChild("xsnav") private xSnav:SidenavComponent;
  
 
  public that: any = this;
  public grupo1_customerprofile: FormGroup;
  // here its must be the final model to send
  public fd: FormData;
  public states: any;
  public uobjprofile: any;
  private subscriptionManager:Subscription[]=[];

  @ViewChild(MatAccordion) accordion: MatAccordion;

  public crudMethodsFollows: Icrudmenu = {
    add: () => { this.xFollowsgrid.addNewRowGridFollow(); }
    , delete: () => { }, update: () => { }, search: () => { }, cancel: () => { }, save: () => { }, options: "add"
  }

  public xsection_customerprofile: any = {ready:false};

  constructor(private fb: FormBuilder, private customerServ: CustomerService, public dialog1: DialogsService, public uaccess: UseraccessService) {

    this.grupo1_customerprofile = this.fb.group(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        customername: new FormControl('', [Validators.required]),
        customerlastname: new FormControl('', [Validators.required]),
        dob: new FormControl(),
        servicetrandate: new FormControl(),
        tmpservicetrandatechk: new FormControl(),
        refereddate: new FormControl(),
        phone1: new FormControl(''),
        phone2: new FormControl(''),
        state: new FormControl(''),
        zipcode: new FormControl(''),
        address1: new FormControl(''),
        address2: new FormControl(''),
        currentscore: new FormControl(''),
        scoreprojection: new FormControl(''),
        country: new FormControl(''),
        city: new FormControl(''),
        id: new FormControl(-1)
      }

    );


   
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
    this.xSnav.getUProfile();
    this.fillDataGrid();
    });
  }


  fillDataGrid() {
    //this.gridStuffs.rowData
    // get data from Customer
    
    setTimeout(() => {
      this.subscriptionManager["getCustomerDataSubscription"]=  this.customerServ.getCustomerData().
      subscribe(data => {
        // console.log(data);
        ///this.gridStuffs.rowData = JSON.parse(data);
        this.xCustomergrid.gridStuffs.rowData = data;
      },
        err => {

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

  toggleTab() {
    this.fullObj.defaultObj.showtab2 ? this.fullObj.defaultObj.showtab2 = false :
      this.fullObj.defaultObj.showtab2 = true
  }

  //*************** Here goes the menu button logic ***************
  private crudMethods2: Icrudmenu = {
    add: () => { },
    delete: () => { alert('delete'); },
    update: () => { alert('update'); },
    search: () => { alert('search'); },
    cancel: () => {
      // this.grupo1_customerprofile.reset();
      this.frm.resetForm();
      this.fillDataGrid();
      this.toggleTab();
    }
    ,
    save: () => {
      if (this.fullObj.xvalid()) {
        this.csave();
      } else {
        // alert("Faltan datos por completar");
        for (var item in this.grupo1_customerprofile.controls) {
          this.grupo1_customerprofile.get(item).markAsTouched();
        }

        this.dialog1.diag1("Missing information to complete.", "Warning!!!");
      }

    },
    options: "save,cancel"
  }

  private crudMethods1: Icrudmenu = {
    add: () => {
      //alert(that.frmModel.companyname);
      let tmpModel: any = { id: -1 };
      this.grupo1_customerprofile.patchValue(tmpModel);
      this.toggleTab();
    },
    delete: () => { }, update: () => { },
    search: () => { }
    , cancel: () => { },
    save: () => { }, options: "add"
  }

  csave() {
    //    alert(this.defaultObj.frmModel.email.value);


    this.xFollowsgrid.gridStuffsFollowsAPI.stopEditing();
    
    //this.xFollowsgrid.gridStuffsFollowsAPI.deselectAll();
    setTimeout(() => {


      this.fd = new FormData();
      for (var item in this.grupo1_customerprofile.controls) {
        if (this.grupo1_customerprofile.get(item).value) {
          if (this.grupo1_customerprofile.get(item).value._i) {
            let tdate = moment(this.grupo1_customerprofile.get(item).value).format('MM/DD/YYYY HH:mm');
            // let today = moment().format('MM/DD/YYYY HH:mm');
            // datepicker value
            this.fd.append(item, tdate);
          } else {
            this.fd.append(item, this.grupo1_customerprofile.get(item).value);
          }
        }

      }
      this.fd.append("lockbyuser", this.uobjprofile.uname);
      // gridfollow -------------------
      let rowData = [];
      this.xFollowsgrid.gridStuffsFollowsAPI.forEachNode(node => rowData.push(node.data));
      this.fd.append("gridfollows", JSON.stringify(rowData));
      //-------------------------------

      // update and insert
  this.subscriptionManager["setCustomerDataSubscription"]= this.customerServ.setCustomerData(this.fd)
        .subscribe(data => {
          this.frm.resetForm();
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


    }, 500);  // para esperar por cualquier evento de los componentes hijo se complete



  }

  getUpFileSalida(event) {
    this.fd = event;
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
    xcrudMethods: this.crudMethods2,
  };

  //**** Here is the full object that contain the whole wiring in the app *******
  public fullObj = {
    defaultObj: this.defaultObj,
    xcrudMethods1: this.crudMethods1,
    xcrudMethodsFollows: this.crudMethodsFollows,
    xvalid: () => {
      let result: boolean = false;
      if (this.grupo1_customerprofile.valid) {
        result = true;
      }
      return result;
    }
  }

  ngOnInit(): void {
    // this.states = statesData;
    if(GlobalVariables.ISMOCKUP){
      this.xsection_customerprofile=JSON.parse('{"s1":{"root":{},"grid":{"disable":false},"ch":{"customername":{},"customerlastname":{},"dob":{},"email":{},"phone1":{},"phone2":{},"refereddate":{}}},"s2":{"root":{},"grid":{"disable":false},"ch":{"address1":{},"address2":{},"city":{},"state":{},"zipcode":{},"country":{}}},"s3":{"root":{},"grid":{"disable":false},"ch":{"null":{}}}}'
);
    }else{
    this.uaccess.setUserAccess("customerinfo", this.grupo1_customerprofile, this.xsection_customerprofile);
    }
  }

    ngOnDestroy(): void {
      this.subscriptionManager.forEach(item=>{item.unsubscribe();});
      this.uaccess.killSubscriptions();
      this.uaccess=null;
      this.xSnav.killSubscriptions();
      this.xSnav=null;
      }
}

