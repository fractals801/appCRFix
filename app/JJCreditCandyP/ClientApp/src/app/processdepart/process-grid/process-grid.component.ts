import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-process-grid',
  templateUrl: './process-grid.component.html',
  styleUrls: ['./process-grid.component.css']
})
export class ProcessGridComponent implements OnInit {
 // private gridStuffsProcessAPI:any;
  @Input() inputModel: any;
  @Output() inputModelChange = new EventEmitter<any>();
  
  constructor() { 

  }

  ngOnInit(): void {
  }

}
