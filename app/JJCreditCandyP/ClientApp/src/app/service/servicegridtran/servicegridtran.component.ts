import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { XbuttonComponent } from 'src/app/gridrendercomp/xbutton/xbutton.component';
import { XdatepickerComponent } from 'src/app/gridrendercomp/xdatepicker/xdatepicker.component';
import { XtextareaComponent } from 'src/app/gridrendercomp/xtextarea/xtextarea.component';
import { XtextarearenderComponent } from 'src/app/gridrendercomp/xtextarea/xtextarearender.component';
import { GlobalVariables } from '../../GlobalVars/gvars';
@Component({
  selector: 'app-servicegridtran',
  templateUrl: './servicegridtran.component.html',
  styleUrls: ['./servicegridtran.component.css']
})
export class ServicegridtranComponent implements OnInit,OnDestroy {


  public frameworkComponents: any;
  private subscriptionManager:Subscription[]=[];
  
  constructor() {
    this.frameworkComponents = {
      xdatepickerComponent: XdatepickerComponent,
      xtextarearenderComponent: XtextarearenderComponent,
      xtextareaComponent: XtextareaComponent,
      xbuttonComponent: XbuttonComponent
    };

  }
  ngOnDestroy(): void {
    this.subscriptionManager.forEach(item=>{item.unsubscribe();});
  }

  ngOnInit(): void {

  }


  public gridStuffsServicetranAPI: any;
  @Input() inputModel: any;
  @Output() inputModelChange = new EventEmitter<any>();
 

  // public gridStuffsServicetran = {
  //   gridApi: {},
  //   gridColumnApi: {},
  //   defaultColDef: { resizable: true },
  //   columnDefs: [
  //     { field: 'id', hide: true },
  //     { field: 'document', headerName: 'Document',suppressKeyboardEvent: (params) => this.suppressKBEvent(params), wrapText: true, editable: true, width: 200, cellRenderer: 'xtextarearenderComponent', cellEditor: 'xtextareaComponent' },
  //     { field: 'contractsign', headerName: 'Contract Sign',suppressKeyboardEvent: (params) => this.suppressKBEvent(params), wrapText: true, editable: true, width: 200, cellRenderer: 'xtextarearenderComponent', cellEditor: 'xtextareaComponent' },
  //     { field: 'documentcompleted', headerName: 'Document Completed',suppressKeyboardEvent: (params) => this.suppressKBEvent(params), wrapText: true, editable: true, width: 250, cellRenderer: 'xtextarearenderComponent', cellEditor: 'xtextareaComponent' },
  //     { field: 'createddate', headerName: 'Created Date', editable: false, width: 300, cellEditor: "xdatepickerComponent" },
  //     { field: 'btnremove', headerName: '', cellRenderer: "xbuttonComponent",cellRendererParams:{fnCallback:this.fnCBGridServiceRemove}}
  //   ],
  //   rowData: [],
  //   rowDoubleClicked: (row: any) => {
  //     //      this.fillFields(row)
  //   },

  // };


  public gridStuffsServicetran = {
    gridApi: {},
    gridColumnApi: {},
    defaultColDef: { resizable: true },
    columnDefs: [
      { field: 'id', hide: true },
      { field: 'document', headerName: 'Document',suppressKeyboardEvent: (params) => this.suppressKBEvent(params), wrapText: true, editable: true, width: 200, cellEditor: 'agLargeTextCellEditor' },
      { field: 'contractsign', headerName: 'Contract Sign',suppressKeyboardEvent: (params) => this.suppressKBEvent(params), wrapText: true, editable: true, width: 200, cellEditor: 'agLargeTextCellEditor' },
      { field: 'documentcompleted', headerName: 'Document Completed',suppressKeyboardEvent: (params) => this.suppressKBEvent(params), wrapText: true, editable: true, width: 250, cellEditor: 'agLargeTextCellEditor' },
      { field: 'createddate', headerName: 'Created Date', editable: false, width: 300, cellEditor: "xdatepickerComponent" },
      { field: 'btnremove', headerName: '', cellRenderer: "xbuttonComponent",cellRendererParams:{fnCallback:this.fnCBGridServiceRemove}}
    ],
    rowData: [],
    rowDoubleClicked: (row: any) => {
      //      this.fillFields(row)
    },

  };


  fnCBGridServiceRemove(xparams:any){
    //alert("fdsafds");
       // alert("comments: " + xparams.node.data.comments);
       //console.log(xparams.node.gridApiupdateRowData());
       const selectedRows = xparams.node.data;
       xparams.api.applyTransaction({ remove: [selectedRows] });
      }


  onGridStuffsServicetranReady(params) {
    this.gridStuffsServicetranAPI = params.api;
    // call ajax with customerid and fill all subgrids
    //this.fillDataSubGrids(this.inputModel.grupo1.get("id").value);
    this.fillGridData();
  }

  fillGridData() {

    let custid: string = this.inputModel.grupo1.get("id").value;
    let fd = new FormData();
    fd.append("custid", custid);
    // ojo me quede por aqui,  tengo q llenar el grid al entrar aqui
   
   
   setTimeout(()=>{
    this.subscriptionManager["getDataServiceTranSubscription"]= this.inputModel.ss.xhttp('post', GlobalVariables.WEBAPIPATH + '/service/getDataServiceTran', fd)
      .subscribe(data => {
        let xdata = data;
        for (var item in xdata) {
          xdata[item].createddate = moment(xdata[item].createddate).format("MM/DD/YYYY")
        }
        this.gridStuffsServicetran.rowData = xdata;



// ojo aqui aplico la seguridad para el grid

        //******************* */
        if(this.inputModel.xsection["s2"].grid.disable){
          
          this.gridStuffsServicetran.columnDefs.forEach(element=>{
            element.editable=false;
            if(element.field.toString().includes('btn')){

              element.hide=true;
            }
          });

       

          // esta mierda casi me jode hasta q encontre como hacerlo
          this.gridStuffsServicetranAPI.setColumnDefs(this.gridStuffsServicetran.columnDefs);
        
        }
        //*********************** */



      },
        err => { alert('Datagrid Service Tran'); return false; }
      );
      
    });
  }



  addNewRowGridServicetran() {
    this.gridStuffsServicetranAPI.stopEditing();
    let xidcustomer = this.inputModel.grupo1.get("id").value;
    this.gridStuffsServicetranAPI.applyTransaction({
      add: [{
        id: "-1", idcustomer: xidcustomer, createddate: moment(new Date()).format("MM/DD/YYYY"),
        document: "", contractsign: "", documentcompleted: "",lastupdateDate:null,xchanged:0
      }],
      addIndex: 0
    });
  }

  suppressKBEvent(params) {
    var key = params.event.key;
    return key === 'ArrowLeft' || key === 'ArrowRight' || key === 'Enter';
  }

  public onCellValueChanged(event)
  {

    //alert("cambio por: "+this.inputModel.uobjprofile.uname);
    
     event.data.lastupdateuname=this.inputModel.uobjprofile.uname;
     event.data.lastupdateDate= moment(new Date()).format("MM/DD/YYYY HH:mm:ss");
     event.data.xchanged=1;
  //   alert(event.data.xchanged+"");
  }

  // let m = moment(row.data.officialstartdate, 'YYYY/MM/DD');
  // let tmpofficialstartdaate = m.isValid() ? m : '';
  // // m = moment(row.data.refereddate, 'YYYY/MM/DD');
  // // let tmprefereddate = m.isValid() ? m : '';
  // let tmpModel: any = {
  //   Document: row.data.Document,
  //   contractsign: row.data.contractsign,
  //   //dob: m.isValid() ? m.set({'year':2020,'month':1,'date':5}) : '',
  //   officialstartdate: tmpofficialstartdaate,
  //   documentcompleted: row.data.documentcompleted,
  //   id: row.data.id
  // };

  // this.inputModel.grupo1.patchValue(tmpModel);
  // this.inputModel.toggleTab();






}
