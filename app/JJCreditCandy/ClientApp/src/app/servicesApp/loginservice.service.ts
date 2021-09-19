import { Injectable } from '@angular/core';
import { GlobalVariables } from '../GlobalVars/gvars';
import { ServiceHttpService } from './service-http.service';



@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor(private ss: ServiceHttpService) {

  }

  public login(fd: FormData) {
        return this.ss.xhttp('post', GlobalVariables.WEBAPIPATH + '/Login/valid', fd);
 
  }



}
