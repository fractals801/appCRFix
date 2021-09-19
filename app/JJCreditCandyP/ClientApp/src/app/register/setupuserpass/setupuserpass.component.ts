import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';



@Component({
  selector: 'app-setupuserpass',
  templateUrl: './setupuserpass.component.html',
  styleUrls: ['./setupuserpass.component.css']
})
export class SetupuserpassComponent implements OnInit {

  @Input() inputModel:any;
  @Output() inputModelChange=new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
