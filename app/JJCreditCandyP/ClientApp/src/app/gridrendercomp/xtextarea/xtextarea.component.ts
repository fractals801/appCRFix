
import { AfterViewInit, Component } from '@angular/core';
import { AgEditorComponent } from 'ag-grid-angular';
import { ICellEditorParams, IAfterGuiAttachedParams, GridApi } from 'ag-grid-community';


@Component({
  selector: 'app-xtextarea',
  templateUrl: './xtextarea.component.html',
  styleUrls: ['./xtextarea.component.css']
})

export class XtextareaComponent implements AgEditorComponent, AfterViewInit {
  constructor() { }
  public xreadonly:boolean;
  private agGrid : GridApi
  public gtextareavalue: any;
  ngAfterViewInit(): void {
    //throw new Error('Method not implemented.');
   // this.xreadonly=false;
  }
  
  getValue() {
    return this.gtextareavalue;
  }

  getPopupPosition?(): string {
    //throw new Error('Method not implemented.');
    return "";
  }
  isCancelBeforeStart?(): boolean {
    //throw new Error('Method not implemented.');
    return false;
  }
  isCancelAfterEnd?(): boolean {
    //throw new Error('Method not implemented.');
    return false;
  }
  focusIn?(): void {
    //throw new Error('Method not implemented.');
  }
  focusOut?(): void {
    //throw new Error('Method not implemented.');
   
  }
  getFrameworkComponentInstance?() {
    // throw new Error('Method not implemented.');
  }
  agInit(params: ICellEditorParams): void {
    this.agGrid = params.api;
    
    this.gtextareavalue = params.value;
    //this.xreadonly=false;
    //alert('render false');
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    //  throw new Error('Method not implemented.');
  }




  isPopup() {
    return true;
  }

}
