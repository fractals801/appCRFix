import { Component, OnInit,  ViewChild, AfterViewInit, Output, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVariables } from '../GlobalVars/gvars';
import { UprofileService } from '../servicesApp/uprofile.service'
import { DialogsService } from '../servicesApp/dialogs.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent implements OnInit {
  public xusername: string = "";
  public xumasteruser:string="";
  sidenavWidth = 15;
  ngStyle: string;
  ImagePath: string
  public vtoggle: boolean=true;
  public subscriptionManager:Subscription[]=[];
  //@ViewChild('sidenav') sidenav: any;

  @Input() inputModel: any;
  @Output() inputModelChange = new EventEmitter<any>();

  constructor(private tmprouter: Router,
    public uprofile: UprofileService,
    public dialog1: DialogsService) {
    this.ImagePath = GlobalVariables.IMAGESPATH + "JJ Cartoon Circle alone circle Big .webp";
   }
  
 public getUProfile(){
  this.subscriptionManager["UprofileSubscription"]=  this.uprofile.getUprofile()
      .subscribe(data => { 

        //data.uemail,data.uname,data.role

        //this.dialog1.diag1(data.uemail, "Warning!!!");

        this.inputModel.uobjprofile=data;
        this.xusername = data.ufullname;
        this.xumasteruser=data.umasteruser;
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
            this.dialog1.diag1(err.error.text ? err.error.text : err.error.message, "Warning!!!");
          }
        }
      );
    ////  this.vtoggle = true;
  }

  logout() {
    window.sessionStorage.clear();
    this.tmprouter.navigate(["/"]);

  }
  ngOnInit() {

  }

 public toggle() {
    if (this.vtoggle) { this.vtoggle = false; } else { this.vtoggle = true; }

  }
  increase() {
    this.sidenavWidth = 15;
    console.log('increase sidenav width');
  }
  decrease() {
    this.sidenavWidth = 4;
    console.log('decrease sidenav width');
  }
  public killSubscriptions(): void {
    //console.log('Destroy the xxx service');
    this.subscriptionManager.forEach(item=>{item.unsubscribe();});
    }
}
