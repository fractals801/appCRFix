import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { statesData } from 'src/app/GlobalVars/staticInfo/StatesData';
@Component({
  selector: 'app-ciaprof',
  templateUrl: './ciaprof.component.html',
  styleUrls: ['./ciaprof.component.css']
})
export class CiaprofComponent implements OnInit {
@Input() inputModel:any;
@Output() inputModelChange=new EventEmitter<any>();

states:any;
  constructor() {

   }

  ngOnInit(): void {
    this.states = statesData;
    //this.inputModel.tst();
  }


}