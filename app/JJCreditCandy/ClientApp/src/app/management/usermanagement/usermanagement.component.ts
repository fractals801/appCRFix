import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import { Icrudmenu } from 'src/app/crudmenu/icrudmenu';
import { GlobalVariables } from 'src/app/GlobalVars/gvars';
import { IModel1 } from 'src/app/imodels/imodel1';
import { DialogsService } from 'src/app/servicesApp/dialogs.service';
import { ServiceHttpService } from 'src/app/servicesApp/service-http.service';
import { SidenavComponent } from 'src/app/sidenav/sidenav.component';
import { UsergridComponent } from './usergrid/usergrid.component';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponent implements OnInit,AfterViewInit {
  @ViewChild("frm") private frm: NgForm;
  @ViewChild("xUsergrid") private xUsergrid: UsergridComponent;
  @ViewChild("xsnav") private xSnav:SidenavComponent;
  
  public that: any = this;
  public ImagePath: string;
  public credentialsicon: string;
  public grupo1: FormGroup;
  public uobjprofile: any;
  // here its must be the final model to send
  public fd: FormData;
  public profiles: any;

  // me quede por aqui.
  private crudMethods1: Icrudmenu = {
    add: () => {
      this.frm.resetForm();
      let tmpModel: any = { id: -1 };
      this.grupo1.patchValue(tmpModel);

      let xprofiles = this.ss.xhttp('post', GlobalVariables.WEBAPIPATH + '/usermanagement/getProfilesForNewUser', "").
      subscribe(data => {
        this.profiles = data;
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

      


    },
    delete: () => { }, update: () => { },
    search: () => { }
    , cancel: () => { },
    save: () => { }, options: "add"
  }

  private crudMethods2: Icrudmenu = {
    add: () => {

    },
    delete: () => { }, update: () => { },
    search: () => { }
    , cancel: () => {
      this.fillDataGrid();
      this.toggleTab();

    },
    save: () => {
      if (this.fullObj.xvalid()) {
        this.csave();
      } else {
        // alert("Faltan datos por completar");
        for (var item in this.grupo1.controls) {
          this.grupo1.get(item).markAsTouched();
        }

        this.dialog1.diag1("Missing information to complete.", "Warning!!!");
      }
    }, options: "save,cancel"
  }

  public csave() {
    this.fd = new FormData();
    for (var item in this.grupo1.controls) {
      //if (this.grupo1.get(item).value) {
          this.fd.append(item, this.grupo1.get(item).value);
      //}
    }
    

    this.ss.xhttp('post', GlobalVariables.WEBAPIPATH + '/usermanagement/setDataUserInfo', this.fd).
    subscribe(data => {
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
    xcrudMethods: null,
  };

  //**** Here is the full object that contain the whole wiring in the app *******
  public fullObj = {
    defaultObj: this.defaultObj,
    xcrudMethods1: this.crudMethods1,
    xcrudMethods2: this.crudMethods2,
    xvalid: () => {
      let result: boolean = false;
      if (this.grupo1.valid) {
        result = true;
      }
      return result;
    }
  }


  constructor(private fb: FormBuilder, private http: HttpClient,
    private ss: ServiceHttpService, public dialog1: DialogsService) {


    this.grupo1 = new FormGroup({
      uname: new FormControl('', [Validators.required]),
      fullname: new FormControl(''),
      useremail: new FormControl('', [Validators.email, Validators.required]),
      pass: new FormControl('', [Validators.required]),
      passconfirm: new FormControl('', [Validators.required]),
      iddefaulttemplate: new FormControl('',[Validators.required]),
      idrelatedwithcompany:new FormControl(''),
      id: new FormControl()
    });

   // this.fillDataGrid();



  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.xSnav.getUProfile();
      this.fillDataGrid();
      });
  }

  fillDataGrid() {

    this.ss.xhttp('post', GlobalVariables.WEBAPIPATH + '/usermanagement/getData', "").
      subscribe(data => {
        // console.log(data);
        ///this.gridStuffs.rowData = JSON.parse(data);
        this.xUsergrid.gridStuffs.rowData = data;
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




/*
  fillFields(row: any) {

    this.fd = new FormData();
    this.fd.append("id", row.data.id);
    let xprofiles = this.ss.xhttp('post', GlobalVariables.WEBAPIPATH + '/usermanagement/getProfiles', "");
    let xuserinfo = this.ss.xhttp('post', GlobalVariables.WEBAPIPATH + '/usermanagement/getDataUserInfo', this.fd);
    this.toggleTab();
    forkJoin([xprofiles, xuserinfo]).subscribe(dataSec => {

      let resultXuserinfo: any = dataSec[1];
      let resultXprofiles: any = dataSec[0];

      this.grupo1.patchValue({ "id": row.data.id });
      this.grupo1.patchValue({ "uname": resultXuserinfo[0].uname });
      this.grupo1.patchValue({ "fullname": resultXuserinfo[0].fullname });
      this.grupo1.patchValue({ "useremail": resultXuserinfo[0].useremail });
      this.grupo1.patchValue({ "pass": resultXuserinfo[0].pass });
      this.grupo1.patchValue({ "passconfirm": resultXuserinfo[0].pass });
      this.grupo1.patchValue({ "iddefaulttemplate": resultXuserinfo[0].iddefaulttemplate });
      this.grupo1.patchValue({"idrelatedwithcompany":resultXuserinfo[0].idrelatedwithcompany});

      // alert(this.grupo1.get("id").value +"");
      this.profiles = resultXprofiles;
    }

    );
  }

  */


  fillFields(row: any) {

    this.fd = new FormData();
    this.fd.append("id", row.data.id);
    //let xprofiles = this.ss.xhttp('post', GlobalVariables.WEBAPIPATH + '/usermanagement/getProfiles', "");
    let xuserinfo = this.ss.xhttp('post', GlobalVariables.WEBAPIPATH + '/usermanagement/getDataUserInfo', this.fd).
    subscribe(data => {
      // console.log(data);
      ///this.gridStuffs.rowData = JSON.parse(data);
      this.grupo1.patchValue({ "id": row.data.id });
      this.grupo1.patchValue({ "uname": data.uinfo[0].uname });
      this.grupo1.patchValue({ "fullname": data.uinfo[0].fullname });
      this.grupo1.patchValue({ "useremail": data.uinfo[0].useremail });
      this.grupo1.patchValue({ "pass": data.uinfo[0].pass });
      this.grupo1.patchValue({ "passconfirm": data.uinfo[0].pass });
      this.grupo1.patchValue({ "iddefaulttemplate": data.uinfo[0].iddefaulttemplate });
      this.grupo1.patchValue({"idrelatedwithcompany":data.uinfo[0].idrelatedwithcompany});
      this.profiles = data.xprofiles;
      this.toggleTab();
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
    
  }
        

  toggleTab() {
    this.fullObj.defaultObj.showtab2 ? this.fullObj.defaultObj.showtab2 = false :
    this.fullObj.defaultObj.showtab2 = true
  }

  ngOnInit(): void {
    this.ImagePath = GlobalVariables.IMAGESPATH + "JJ Cartoon Circle alone circle Big .webp";
    this.credentialsicon = GlobalVariables.IMAGESPATH + "Credentials.png";
  }
}
