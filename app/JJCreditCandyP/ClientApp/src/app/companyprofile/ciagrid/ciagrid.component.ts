import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-ciagrid',
  templateUrl: './ciagrid.component.html',
  styleUrls: ['./ciagrid.component.css']
})
export class CiagridComponent implements OnInit {

  @Input() inputModel: any;
  @Output() inputModelChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
