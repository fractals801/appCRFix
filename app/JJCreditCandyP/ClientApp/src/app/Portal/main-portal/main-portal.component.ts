import { AfterViewInit, Component, OnInit } from '@angular/core';
import {Theme1} from 'src/app/GlobalVars/staticInfo/MaterialDynamicCss';

@Component({
  selector: 'app-main-portal',
  templateUrl: './main-portal.component.html',
  styleUrls: ['./main-portal.component.css']
})
export class MainPortalComponent implements OnInit{
  ngOnInit(): void {
    
  }
  public that: any = this;
  public tm1:any=Theme1;
  



}
