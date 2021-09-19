import { Component, Input, OnInit, EventEmitter,Output } from '@angular/core';
import { statesData } from 'src/app/GlobalVars/staticInfo/StatesData';


@Component({
  selector: 'app-customerdemogra',
  templateUrl: './customerdemogra.component.html',
  styleUrls: ['./customerdemogra.component.css']
})
export class CustomerdemograComponent implements OnInit {
@Input() inputModel:any;
@Output() inputModelChange=new EventEmitter<any>();

  constructor() { }
states:any;
  ngOnInit(): void {
    this.states = statesData;
  }

}
