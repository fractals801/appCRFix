import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Dialog1Component } from '../dialog1/dialog1.component';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  constructor(public dialog1:MatDialog) { }

  public  diag1(pContent:string ,pTitle:string):void
  {
    this.dialog1.open(Dialog1Component, {
      panelClass: 'dialogset', disableClose: true, data: {
        content: pContent,
        title: pTitle
      }
    });

  }
}
