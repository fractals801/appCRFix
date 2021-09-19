import { Injectable } from '@angular/core';

import { Dialog1Component } from '../dialog1/dialog1.component';
import { GlobalVariables } from '../GlobalVars/gvars';
import { ServiceHttpService } from './service-http.service';
import { DialogsService } from './dialogs.service';

@Injectable({
  providedIn: 'root'
})

export class UprofileService {

  constructor(private ss: ServiceHttpService, public dialog1: DialogsService) { }
  public getUprofile() {
        return this.ss.xhttp('post', GlobalVariables.WEBAPIPATH + '/uprofile/getData', null)
   }

}
