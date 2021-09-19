import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MockupData } from '../GlobalVars/staticInfo/MockupData';
import { GlobalVariables } from '../GlobalVars/gvars';

@Injectable({
  providedIn: 'root'
})
export class ServiceHttpService {

  constructor(private http: HttpClient) { }

  public xhttp(getorpost: string, url: string, clientData: any, auth: any = window.sessionStorage.getItem("twj")) {
   if(!GlobalVariables.ISMOCKUP){
    if (getorpost.toLowerCase() === 'post') {
      return this.httpPost(url, clientData, auth);
    }
    else if (getorpost.toLowerCase() === 'get') {
      return this.httpGet(url, clientData, auth);
    }
  }
    else{
// mockup data
         
     let mockup = new Observable((observer) => {
      let dataForm:FormData=clientData ;
      let data:any;
      let local:any=url;
      let fakeurl=url.replace(GlobalVariables.WEBAPIPATH,"").replace(/\//g,"").toLowerCase();
      data =  MockupData[fakeurl].data;
      observer.next(data);
        // el error lo maneja uno
       //observer.error("errr de mierda");
      observer.complete();
      
       return {
        unsubscribe() {
          // evento de cuando haga  un unsubscribe
        }
      };
          
      }) ;
      
      return mockup;
     }
  }

  httpGet(url: string, clientData: any, auth: any = window.sessionStorage.getItem("twj")) {
    let pheaders = new HttpHeaders();
    //pheaders= pheaders.append("Access-Control-Allow-Origin", "*");
    if (auth) {
      pheaders = pheaders.append("Authorization", auth);
    }
    let options = {
      headers: pheaders
    }
    let xobservable: any = this.http.get<any>(url, options);
    return xobservable;
  }

  //httpPost(url: string,clientData:any) {
  //  let pheaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  //  pheaders.append("Access-Control-Allow-Origin", "*");
  //  let options = {
  //    headers: pheaders
  //  }
  //  let xobservable: any = this.http.post<any>(url,clientData, options);
  //  return xobservable;
  //}


  httpPost(url: string, clientData: any, auth: any) {
    let pheaders = new HttpHeaders();
    //pheaders=pheaders.append('Accept', 'application/json');
    //pheaders=pheaders.append("Access-Control-Allow-Origin", "*");
    // pheaders=pheaders.append("enctype", "multipart/form-data");
    if (auth) {
      pheaders = pheaders.append("Authorization", auth);
    }
    let options = {
      headers: pheaders
    }
    let xobservable: any = this.http.post<any>(url, clientData, options);
    return xobservable;
  }




}
