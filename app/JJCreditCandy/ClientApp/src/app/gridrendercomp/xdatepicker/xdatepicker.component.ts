import { Component,ViewChild, ViewContainerRef  } from '@angular/core';

import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';
import * as moment from 'moment';


@Component({
  selector: 'app-xdatepicker',
  templateUrl: './xdatepicker.component.html',
  styleUrls: ['./xdatepicker.component.css']
})
export class XdatepickerComponent implements ICellRendererAngularComp   {
  
  @ViewChild('dpickergrid', { read: ViewContainerRef }) public dpickergrid: any;
  public  gvalue:any;
  constructor() { }
  refresh(params: ICellRendererParams): boolean {
    return false;
    //throw new Error('Method not implemented.');
  }
  agInit(params: ICellRendererParams): void {
  //console.log(params);
  this.gvalue = moment(params.value,'MM/DD/YYYY');

  
  }
  getValue(){
        
  return  moment(this.gvalue).format('MM/DD/YYYY');

  }


  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
  //  throw new Error('Method not implemented.');
  }
  
  
  


}
