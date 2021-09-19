import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GlobalVariables } from '../GlobalVars/gvars';
import { ServiceHttpService } from './service-http.service';

@Injectable({
  providedIn: 'root'
})
export class ServicegeneralService {

  constructor(private ss: ServiceHttpService) { }


  // public xdisable(xgroup:FormGroup,xfield:string){
   
  //   xgroup.get(xfield).disable();
   
  // }

  //  public xhide(xsection:any,xfield:string){

  //   xsection[xfield]={display:"none"};

  //  }

   

}
