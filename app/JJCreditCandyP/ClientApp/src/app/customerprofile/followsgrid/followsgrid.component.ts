import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
//import { GridApi } from 'ag-grid-community';
import * as moment from 'moment';
//import { eventNames } from 'process';
import { Dialog1Component } from 'src/app/dialog1/dialog1.component';
import { XbuttonComponent } from 'src/app/gridrendercomp/xbutton/xbutton.component';
import { XdatepickerComponent } from 'src/app/gridrendercomp/xdatepicker/xdatepicker.component';
import { XtextareaComponent } from 'src/app/gridrendercomp/xtextarea/xtextarea.component';
import { XtextarearenderComponent } from 'src/app/gridrendercomp/xtextarea/xtextarearender.component';
//import { GlobalVariables, GlobalVariables2 } from '../../GlobalVars/gvars';

@Component({
  selector: 'app-followsgrid',
  templateUrl: './followsgrid.component.html',
  styleUrls: ['./followsgrid.component.css']
})
export class FollowsgridComponent implements OnInit, AfterContentInit {

  @Input() inputModel: any;
  @Output() inputModelChange = new EventEmitter<any>();


  public frameworkComponents: any;
  public gridStuffsFollowsAPI: any;

  // flag para grid disable 
  public griddisable=false;

  public gridStuffsFollows = {
    defaultColDef: { resizable: true },
    columnDefs: [
      { field: 'id', hide: true },
      { field: 'idcustomer', hide: true },
      { field: 'lastupdateuname', hide: true },
      { field: 'datefollow', editable: true, headerName: 'Date', cellEditor: "xdatepickerComponent" },
      { field: 'comments', suppressKeyboardEvent: (params) => this.suppressKBEvent(params), editable: !this.griddisable, wrapText: true, headerName: 'Comments', cellRenderer: 'xtextarearenderComponent', cellEditor: 'xtextareaComponent' },
      { field: 'fcommuresultcomment', suppressKeyboardEvent: (params) => this.suppressKBEvent(params), wrapText: true, editable: !this.griddisable, headerName: 'Communication Result', cellRenderer: 'xtextarearenderComponent', cellEditor: 'xtextareaComponent' },
      { field: 'decisioncomment', width: 230, suppressKeyboardEvent: (params) => this.suppressKBEvent(params), wrapText: true, editable: !this.griddisable, headerName: 'Decision', cellRenderer: 'xtextarearenderComponent', cellEditor: 'xtextareaComponent' },
      { field: 'btnremove', headerName: '',hide:this.griddisable, cellRenderer: "xbuttonComponent", cellRendererParams: { fnCallback: this.fnCBGridFollowsRemove } }
    ],

    rowData: []

  };

  public focusOut() {

  }

  public onCellValueChanged(event) {

    //alert("cambio por: "+this.inputModel.uobjprofile.uname);

    event.data.lastupdateuname = this.inputModel.uobjprofile.uname;
    event.data.lastupdateDate = moment(new Date()).format("MM/DD/YYYY HH:mm:ss");
    event.data.xchanged = 1;
    //   alert(event.data.xchanged+"");
  }

  onGridStuffsFollowsReady(params) {
    this.gridStuffsFollowsAPI = params.api;
    //this.gridStuffsFollowsAPI.stopEditingWhenGridLosesFocus=true;

    // call ajax with customerid and fill all subgrids
    this.fillDataSubGrids(this.inputModel.grupo1_customerprofile.get("id").value);
  }

  // fillDataSubGrids(pCustid:string) {
  //   //this.gridStuffs.rowData
  //   let fdsubgrids: FormData = new FormData();
  //   fdsubgrids.append("custid",pCustid);
  //   this.inputModel.ss.xhttp('post', GlobalVariables.WEBAPIPATH + '/allCustomers/getDataSubTables',fdsubgrids).
  //       subscribe(data => {
  //         var xdata=data;
  //         for(var item in xdata){
  //             xdata[item].datefollow=moment(xdata[item].datefollow).format("MM/DD/YYYY");         
  //         }

  //         this.gridStuffsFollowsAPI.setRowData(xdata);
  //     },
  //       err => { 

  //         //alert('Subgrids'); return false; 
  //         this.dialog1.open(Dialog1Component,{ width: '40%',disableClose: true,data:{content:err.message,
  //           title:"Warning!!!" }});
  //       }
  //     )
  // }


  fillDataSubGrids(pCustid: string) {
    //this.gridStuffs.rowData
    let fdsubgrids: FormData = new FormData();
    fdsubgrids.append("custid", pCustid);
    this.inputModel.customerServ.getCustomerFollows(fdsubgrids).
      subscribe(data => {
        var xdata = data;
        for (var item in xdata) {
          xdata[item].datefollow = moment(xdata[item].datefollow).format("MM/DD/YYYY");
        }

        this.gridStuffsFollowsAPI.setRowData(xdata);
    
        //----------------------


        // ojo aqui aplico la seguridad para el grid

        //******************* */
        if(this.inputModel.xsection_customerprofile["s3"].grid.disable){
          this.griddisable=true;
          this.gridStuffsFollows.columnDefs.forEach(element=>{
            element.editable=false;
            if(element.field.toString().includes('btn')){

              element.hide=true;
            }
          });


          // esta mierda casi me jode hasta q encontre como hacerlo
          this.gridStuffsFollowsAPI.setColumnDefs(this.gridStuffsFollows.columnDefs);
        
        }
        //*********************** */

      },
        err => {

          //alert('Subgrids'); return false; 
          this.dialog1.open(Dialog1Component, {
            width: '40%', disableClose: true, data: {
              content: err.message,
              title: "Warning!!!"
            }
          });
        }
      )
  }



  suppressKBEvent(params) {
    var key = params.event.key;
    return key === 'ArrowLeft' || key === 'ArrowRight' || key === 'Enter';
  }

  addNewRowGridFollow() {
    this.gridStuffsFollowsAPI.stopEditing();
    let xidcustomer = this.inputModel.grupo1_customerprofile.get("id").value;
    this.gridStuffsFollowsAPI.applyTransaction({
      add: [{
        id: "-1", idcustomer: xidcustomer, datefollow: moment(new Date()).format("MM/DD/YYYY"),
        comments: "", fcommuresultcomment: "", decisioncomment: "", lastupdateuname: this.inputModel.uobjprofile.uname,
        Createduname: this.inputModel.uobjprofile.uname, lastupdateDate: null, CreatedDate: null, xchanged: 0
      }],
      addIndex: 0
    });


  }

  fnCBGridFollowsRemove(xparams: any) {
    //alert("fdsafds");
    // alert("comments: " + xparams.node.data.comments);
    //console.log(xparams.node.gridApiupdateRowData());
    const selectedRows = xparams.node.data;
    xparams.api.applyTransaction({ remove: [selectedRows] });
  }






  constructor(public dialog1: MatDialog) {

    this.frameworkComponents = {
      xdatepickerComponent: XdatepickerComponent,
      xtextarearenderComponent: XtextarearenderComponent,
      xtextareaComponent: XtextareaComponent,
      xbuttonComponent: XbuttonComponent,
    };
  }
  ngAfterContentInit(): void {

  }

  ngOnInit(): void {
   
  }

}
