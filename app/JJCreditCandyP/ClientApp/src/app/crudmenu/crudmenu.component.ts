import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-crudmenu',
  templateUrl: './crudmenu.component.html',
  styleUrls: ['./crudmenu.component.css']
 

})
export class CrudmenuComponent implements OnInit {

  @Input() inputModel: any;
  @Output() inputModelChange = new EventEmitter<any>();
  aOptions: any;
  constructor() {

  }

    

  ngOnInit(): void {
   // this.aOptions = this.inputModel.defaultObj.xcrudMethods.options.split(',');
   this.aOptions = this.inputModel.options.split(',');
    if (this.aOptions.length == 1) {
      if (this.aOptions[0].trim() === "")
      {
        this.aOptions = [];
      }
    }
  }

}
