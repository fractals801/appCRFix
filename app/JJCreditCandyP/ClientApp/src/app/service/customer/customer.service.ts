import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceHttpService } from '../../servicesApp/service-http.service';
import { GlobalVariables, GlobalVariables2 } from '../../GlobalVars/gvars';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient,
    private ss: ServiceHttpService) { 

  }

getCustomerData():any{
  return this.ss.xhttp('post', GlobalVariables.WEBAPIPATH + '/allCustomers/getData', '');
   }

setCustomerData(fd:FormData):any{
  return this.ss.xhttp('post', GlobalVariables.WEBAPIPATH + '/Customerinfo/setData', fd);
}
getCustomerFollows(fd:FormData){
  return this.ss.xhttp('post', GlobalVariables.WEBAPIPATH + '/allCustomers/getDataSubTables',fd);
}

}
