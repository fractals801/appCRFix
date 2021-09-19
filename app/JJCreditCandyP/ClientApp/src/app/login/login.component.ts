import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVariables, GlobalVariables2 } from '../GlobalVars/gvars';
import { LoginserviceService } from '../servicesApp/loginservice.service';
//import { EncryptService } from '../servicesApp/encrypt.service';
import { DialogsService } from '../servicesApp/dialogs.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public ImagePath: string;
  public uname: string;
  public pass: string;
  private fd: FormData;



  @ViewChild("uname1") public xuname: HTMLElement;

  constructor(private ls: LoginserviceService, private tmprouter: Router,
    public dialog1: DialogsService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.ImagePath = GlobalVariables.IMAGESPATH + "JJ Cartoon Circle alone circle Big .webp";

    //alert(document.querySelector("#twj")["value"]);
  }


  ngOnInit(): void {

  }

  public register() {

    this.tmprouter.navigate(["/register"]);
  }

  public valid() {

    if (!this.uname || !this.pass) {
      this.dialog1.diag1("Empty user or password", "Warning!!!");
      return;
    }

    if (this.uname.trim() === "" || this.pass.trim() === "") {
      this.dialog1.diag1("Empty user or password", "Warning!!!");
      return;
    }

    let fd: FormData = new FormData();
    fd = new FormData();
    fd.append("uname", this.uname);
    fd.append("pass", this.pass);



    this.ls.login(fd).subscribe(data => {
    
      if (data.result == "successful") {
        //this.tmprouter.navigate(["/ciaprofile"],{ queryParams: { tk: data.tk } } );
        // this.tmprouter.navigate(["/ciaprofile"],{ state: { tk: data.tk } } ); 
        window.sessionStorage.setItem("twj", Object.freeze('Bearer ' + data.tk));

        ///let encUser:string =this.enc.encryptWithAES(this.uname,"qloco");

        ///alert(encUser) ;

        /// alert(this.enc.decryptWithAES(encUser,"qloco"));

        ///   window.sessionStorage.setItem("u", Object.freeze(encUser));

        //document.querySelector("#twj")["value"]=GlobalVariables2.TOKEN;
        this.tmprouter.navigate(["/ciaprofile"]);

      } else {

        this.dialog1.diag1("Invalid Credentials", "Warning!!!");

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
    //;

  }



}
