import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Output, Input, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ServiceHttpService } from '../servicesApp/service-http.service';


@Component({
  selector: 'app-upload-comp',
  templateUrl: './upload-comp.component.html',
  styleUrls: ['./upload-comp.component.css']
})
export class UploadCompComponent implements OnInit {

  selectedFile: File = null;
  uploadedPercentage = 0;
  showMessage = false;
  message: String = '';
  @Input() entrada: FormData;
  @Output() salida: any = new EventEmitter();
  constructor(private http: HttpClient, private ss: ServiceHttpService) { }

  ngOnInit() { }



  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    this.onUpload();
  }

  onUpload() {
    //// const fd = new FormData();
    let fd = this.entrada;
    this.showMessage = false;
    //console.log(this.selectedFile.name);
    //fd.append('file', this.selectedFile, this.selectedFile.name);
    fd.append('file', this.selectedFile, this.selectedFile.name);
    ////fd.append('prueba1', 'pagan carde');
    this.salida.emit(fd);

    ////this.ss.xhttp('post', 'https://localhost:44335/upfile', fd).subscribe(data => {
    ////  console.log(data);
    ////});
  }




  onUpload2() {
    const fd = new FormData();
    this.showMessage = false;
    //console.log(this.selectedFile.name);
    //fd.append('file', this.selectedFile, this.selectedFile.name);
    fd.append('file', this.selectedFile, this.selectedFile.name);
    //fd.append('prueba1', 'pagan carde');
    let pheaders = new HttpHeaders();
    pheaders.append('Accept', 'application/json');
    pheaders.append("Access-Control-Allow-Origin", "*");
    pheaders.append("enctype", "multipart/form-data");
    //pheaders.delete('Content-Type');
    let options = {
      headers: pheaders,

    }

    //{
    //  reportProgress: true, observe: 'events'
    //}



    this.http.post('https://localhost:44335/upfile', fd, options).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          // this.slimLoadingBarService.start();
          break;
        case HttpEventType.Response:
          //   this.slimLoadingBarService.complete();
          this.message = "Uploaded Successfully";
          this.showMessage = true;
          break;
        case 1: {
          if (Math.round(this.uploadedPercentage) !== Math.round(event['loaded'] / event['total'] * 100)) {
            this.uploadedPercentage = event['loaded'] / event['total'] * 100;
            //  this.slimLoadingBarService.progress = Math.round(this.uploadedPercentage);
          }
          break;
        }
      }
    },
      error => {
        console.log(error);
        this.message = "Something went wrong";
        this.showMessage = true;
        //  this.slimLoadingBarService.reset();
      });
  }








}
