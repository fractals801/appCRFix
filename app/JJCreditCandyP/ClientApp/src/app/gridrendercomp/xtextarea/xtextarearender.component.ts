import { Component, ElementRef, ViewChild } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'app-xtextarearender',
  templateUrl:'./xtextareadiv.component.html',
  styleUrls: ['./xtextarea.component.css']
})

export class XtextarearenderComponent implements ICellRendererAngularComp {
 // @ViewChild("textarea") textArea : ElementRef;
  public xreadonly:boolean;
  constructor() {
  }

onkeypressevent(e)
{
//e.stopPropagation(); 
}

  public gtextareavalue: any;
  refresh(params: ICellRendererParams): boolean {
    this.gtextareavalue = params.value;
   // this.textArea.nativeElement["value"]=this.gtextareavalue;
    //console.log("gtextareavalue",this.gtextareavalue);
    //this.xreadonly=true;
    return true;
  }

  agInit(params: ICellRendererParams): void {
    //throw new Error('Method not implemented.');
    this.gtextareavalue = params.value;
    this.xreadonly=false;
//alert('render true');
  }

  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    //throw new Error('Method not implemented.');
  }

  // getValue() {
  //   return this.gtextareavalue;
  // }
  
  
}
