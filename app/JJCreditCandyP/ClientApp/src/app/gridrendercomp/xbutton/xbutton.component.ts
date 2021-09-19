import { Component} from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'app-xbutton',
  templateUrl: './xbutton.component.html',
  styleUrls: ['./xbutton.component.css']
})
export class XbuttonComponent implements ICellRendererAngularComp {
private xparams:any;

  constructor() { }
  refresh(params: ICellRendererParams): boolean {
    //throw new Error('Method not implemented.');
    this.xparams=params;
    return  true;
  }
  agInit(params: ICellRendererParams): void {
    //throw new Error('Method not implemented.');
    this.xparams=params;
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
   // throw new Error('Method not implemented.');
  }
   
  remove(){
//    callbackFn(this.cellvalue);
      this.xparams.fnCallback(this.xparams);
  }

}
