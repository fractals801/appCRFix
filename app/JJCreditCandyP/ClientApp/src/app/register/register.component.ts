import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Icrudmenu } from '../crudmenu/icrudmenu';
import { GlobalVariables, GlobalVariables2 } from '../GlobalVars/gvars';
import { IModel1 } from '../imodels/imodel1';
import { ServiceHttpService } from '../servicesApp/service-http.service';
import { DialogsService } from '../servicesApp/dialogs.service';
import { UseraccessService } from '../servicesApp/useraccess.service';
import { ServicegeneralService } from '../servicesApp/servicegeneral.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {

  public that: any = this;
  public ImagePath: string;
  public credentialsicon: string;
  public grupo1: FormGroup;
  public grupo1_companyprofile: FormGroup;

  public uobjprofile: any;

  public xsection_companyprofile: any = {
    s1: {
      ready:false,
      root: {},
      ch: {
        companyname: {},
        contactname: {},
        contactlastname: {},
        email: {},
        phone1: {},
        phone2: {},
        addr1: {},
        addr2: {},
        city: {},
        state: {},
        zipcode: {},
        country: {},
      }
    }
  };


  @ViewChild("frm") private frm: NgForm;




  public defaultObj: IModel1 = {
    options2: FormGroup,
    hideRequiredControl: new FormControl(false),
    floatLabelControl: new FormControl('auto'),
    showtab2: false,
    frmModel: {},
    getErrorMessage: (that) => {
      // if (that.errors){
      let varname = Object.keys(that.errors)[0]

      if (that.hasError('required')) {
        return 'You must enter a value';
      }
      if (varname === "email") {
        return that.hasError(varname) ? 'Not a valid email' : '';
      }

      return "Something wrong with " + varname;
      // }
      // return "Something wrong ";
    },
    xcrudMethods: null
  };

  //**** Here is the full object that contain the whole wiring in the app *******
  public fullObj = {
    defaultObj: this.defaultObj,
    xcrudMethods2: null,
    xvalid: () => {
      let result: boolean = false;

      if (this.grupo1.valid) {
        result = true;
      } else {

        // after validate force to display errors
        for (var item in this.grupo1.controls) {
          this.grupo1.get(item).markAsTouched();
        }

      }
      return result;
    }
  }



  constructor(private tmprouter: Router,
    private ss: ServiceHttpService, public dialog1: DialogsService,
    public uaccess: UseraccessService, private gs: ServicegeneralService) {

    this.grupo1 = new FormGroup({
      uname: new FormControl('', [Validators.required]),
      fullname: new FormControl(''),
      useremail: new FormControl('', [Validators.email, Validators.required]),
      pass: new FormControl('', [Validators.required]),
      passconfirm: new FormControl('', [Validators.required]),
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
      id: new FormControl()
    });

    this.grupo1_companyprofile=this.grupo1;

  }

  ngOnInit(): void {
    this.ImagePath = GlobalVariables.IMAGESPATH + "JJ Cartoon Circle alone circle Big .webp";
    this.credentialsicon = GlobalVariables.IMAGESPATH + "Credentials.png";
  }


  csave() {

   

      if (this.fullObj.xvalid() && this.grupo1.get("pass").value == this.grupo1.get("passconfirm").value) {
        let tmpModel: any = { id: -1 };
        this.grupo1.patchValue(tmpModel);

        //---------------------
        let fd = new FormData();
        for (var item in this.grupo1.controls) {
          if (this.grupo1.get(item).value) {
            if (this.grupo1.get(item).value._i) {
              let tdate = moment(this.grupo1.get(item).value).format('MM/DD/YYYY HH:mm');
              // let today = moment().format('MM/DD/YYYY HH:mm');
              // datepicker value
              fd.append(item, tdate);
            } else {
              fd.append(item, this.grupo1.get(item).value);
            }
          }
        }
        //-------------------------
        // update and insert
        this.ss.xhttp('post', GlobalVariables.WEBAPIPATH + '/Register/setData', fd).pipe(
        )
          .subscribe(data => {

            this.tmprouter.navigate(["/"]);
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
      else {
        //alert("Missing data to complete");
        this.dialog1.diag1("Missing information to complete.", "Warning!!!");
      }
    
  }

  btnCancel() {
    this.frm.resetForm();
    this.tmprouter.navigate(["/"]);
  }

}