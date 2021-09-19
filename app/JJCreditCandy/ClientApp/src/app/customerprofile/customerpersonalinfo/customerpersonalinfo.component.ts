import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-customerpersonalinfo',
  templateUrl: './customerpersonalinfo.component.html',
  styleUrls: ['./customerpersonalinfo.component.css']
})
export class CustomerpersonalinfoComponent implements OnInit {

  @Input() inputModel:any; 
  @Output() inputModelChange= new EventEmitter<any>();


  constructor() {
     //this._elementRef.nativeElement;

     //console.log("test", this._elementRef.querySelect("#customername").value="wasky")
   }

 
  ngOnInit(): void {
        
  }

}
