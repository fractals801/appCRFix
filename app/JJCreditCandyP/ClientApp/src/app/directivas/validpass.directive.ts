import { Directive,ElementRef,HostListener,Input,Renderer2 } from '@angular/core';

@Directive({
  selector: '[Validpass]'
})
export class ValidpassDirective {
@Input() inputModel:any;

  constructor(eRef:ElementRef) {

   }

   @HostListener('blur', ['$event.target'])
   lostfocus(inp) {
    if(this.inputModel.grupo1.get("pass").value !== this.inputModel.grupo1.get("passconfirm").value)
    {
      alert("Password not match.");
    }
     //console.log('input', inp);
  }

}
