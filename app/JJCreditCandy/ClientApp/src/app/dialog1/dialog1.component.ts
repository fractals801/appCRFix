import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalVariables, GlobalVariables2 } from '../GlobalVars/gvars';

@Component({
  selector: 'app-dialog1',
  templateUrl: './dialog1.component.html',
  styleUrls: ['./dialog1.component.css']
})
export class Dialog1Component implements OnInit {

  public ImagePath: string;
  public data:any;
  constructor(
    private dialogRef: MatDialogRef<Dialog1Component>,
        @Inject(MAT_DIALOG_DATA) data
  ) { 

     this.data=data;

  }

  ngOnInit(): void {
    this.ImagePath = GlobalVariables.IMAGESPATH + "JJ Cartoon Circle alone circle Big .webp";
  }

}
