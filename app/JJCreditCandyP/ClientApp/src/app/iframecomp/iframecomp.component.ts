import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-iframecomp',
  templateUrl: './iframecomp.component.html',
  styleUrls: ['./iframecomp.component.css']
})
export class IframecompComponent implements OnInit,AfterViewInit{

  iframeUrl: SafeResourceUrl;
  public uobjprofile: any;
  public that:any=this;
  @ViewChild("xsnav") public xSnav:SidenavComponent;


  //@Input() paramObj: any;

  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute) {
    this.iframeUrl = sanitizer.bypassSecurityTrustResourceUrl(route.snapshot.data['url']);
  }
  ngAfterViewInit(): void {
       this.xSnav.getUProfile();  
  }



  ngOnInit(): void {
     
  }

}
