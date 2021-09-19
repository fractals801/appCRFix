import { Injectable, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GlobalVariables } from '../GlobalVars/gvars';
import { ServiceHttpService } from './service-http.service';
import { DialogsService } from './dialogs.service';
import { ServicegeneralService } from './servicegeneral.service';
import { forkJoin, Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UseraccessService {
  public subscriptionManager:Subscription[]=[];

  constructor(public ss: ServiceHttpService, public dialog1: DialogsService,
    private gs: ServicegeneralService) { }
   
    public killSubscriptions(): void {
      //console.log('Destroy the xxx service');
      this.subscriptionManager.forEach(item=>{item.unsubscribe();});
      }
 
  public getUaccess(screenname: string, gf: FormGroup) {

    let fd = new FormData();
    fd.append("screenname", screenname);
   
      return this.ss.xhttp('post', GlobalVariables.WEBAPIPATH + '/usec/getData', fd)
  }

  public setUserAccess(xscreenname: string, grupo1: FormGroup, xsection: any) {

    let usecinfo = this.getUaccess(xscreenname, grupo1);
    let secstruct = this.setxSectionStructure(xsection, xscreenname);
    this.subscriptionManager["UseraccessSubscription"]=  forkJoin([secstruct, usecinfo]).subscribe(dataSec => {

      // aqui creo la estructura primero   ---------------------
      let objsection: any = {};
      let data: any = dataSec[0];
      for (var item in data) {
        xsection[data[item].sectionname] = {};
        objsection = xsection;
        objsection[data[item].sectionname].root = {};
        objsection[data[item].sectionname].grid = {disable: false};
        objsection[data[item].sectionname].ch = {};
      }
      //----------------------------------
      let xdataSec: any = dataSec[1];
      xdataSec.forEach((element) => {
        //  aprovecho el loop  y lleno ch
        xsection[element.sectionname].ch[element.fieldname] = {};
        // solo lo puse para el grid
        if (element.disablesection == 1) {
          xsection[element.sectionname].grid = { disable: true };
        } else {
          xsection[element.sectionname].grid = { disable: false };
        }
      });

      xdataSec.forEach((element) => {
        if (element.disablesection === 1) {
          this.disableCase(element, grupo1, xsection[element.sectionname]);
        } else if (element.hidesection) {
          this.hideCase(element, xsection[element.sectionname]);
        } else {
          // verifico los campos
          if (element.disablefield === 1) {
            //Busco q pertenezca a la seccion primero
            //if(this.xsection)
            this.disableField(grupo1, element.fieldname);
          }

          if (element.hidefield === 1) {
            this.hideField(xsection[element.sectionname], element.fieldname);
          }

        }
      let ojo=JSON.stringify(xsection);
      });  // foreach

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

  public setxSectionStructure(xsection: any, xscreenname: string) {
    //mierda
    let fd = new FormData();
    fd.append("screenname", xscreenname);
    let objsection: any;
   
    return this.ss.xhttp('post', GlobalVariables.WEBAPIPATH + '/usec/getSectionsbyScreen', fd);
    
  }

  disableCase(xdata: any, grupo: FormGroup, xsection: any) {

    // switch (xdata.sectionname) {
    //   case "section1":
    // this.disableSection(grupo, xsection.s1.ch);
    if (xsection.ch !== null) {
      this.disableSection(grupo, xsection.ch);
    }
    //     break;
    // }

  }

  hideCase(xdata: any, xsection: any) {

    // switch (xdata.sectionname) {
    //   case "section1":
    // this.hideSection(xsection.s1);
    this.hideSection(xsection);
    //     break;
    // }

  }

  public disableSection(xgrupo: FormGroup, xsection: any) {
    if (xsection !== null) {
      // disable all section
      for (var key in xsection) {
        if (key !== 'null') {
          if (xsection.hasOwnProperty(key)) {
            //this.gs.xdisable(xgrupo, key);
            this.disableField(xgrupo, key);
          }
        }
      }
    }
  }

  public disableField(xgrupo: FormGroup, fieldName: string) {
    //this.gs.xdisable(xgrupo,fieldName);

    xgrupo.get(fieldName).disable();
  }



  public hideSection(xsection: any) {

    //this.xsection.s1.root={display:"none"};
    xsection.root = { display: "none" };
  }

  public hideField(xsection: any, fieldName: string) {
    //this.gs.xhide(xsection.ch,fieldName);
    xsection.ch[fieldName] = { display: "none" };
  }


}
