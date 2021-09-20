import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IModel1 } from 'src/app/imodels/imodel1';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { DialogsService } from 'src/app/servicesApp/dialogs.service';
import { UseraccessService } from 'src/app/servicesApp/useraccess.service';
import { Theme1 } from 'src/app/GlobalVars/staticInfo/MaterialDynamicCss';
@Component({
  selector: 'app-pcustomer',
  templateUrl: './pcustomer.component.html',
  styleUrls: ['./pcustomer.component.css']
})
export class PcustomerComponent implements OnInit, AfterViewInit {
// rich quitame 3
  public that: any = this;
  public grupo1_customerprofile: FormGroup;
  public grupo1: FormGroup;
  // here its must be the final model to send
  public fd: FormData;
  public states: any;
  public uobjprofile: any;
  private subscriptionManager: Subscription[] = [];
  public xsection_customerprofile: any = { ready: false };
  public tm1: any = Theme1;

  constructor(private fb: FormBuilder,
    private customerServ: CustomerService, public dialog1: DialogsService, public uaccess: UseraccessService) {

    this.grupo1 = this.fb.group(
      {
        email: new FormControl('rpcarde@gmail.com', [Validators.required, Validators.email]),
        customername: new FormControl('Richard', [Validators.required]),
        customerlastname: new FormControl('Pagan Carde', [Validators.required]),
        dob: new FormControl('1978-07-17'),
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
    this.grupo1_customerprofile = this.grupo1;
    this.uaccess.setUserAccess("mainportal_s1", this.grupo1_customerprofile, this.xsection_customerprofile);

  }
  ngAfterViewInit(): void {

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
    xcrudMethods1: null,
    xcrudMethodsFollows: null,
    xvalid: () => {
      let result: boolean = false;
      if (this.grupo1_customerprofile.valid) {
        result = true;
      }
      return result;
    }
  }


  ngOnInit(): void {


  }

}
