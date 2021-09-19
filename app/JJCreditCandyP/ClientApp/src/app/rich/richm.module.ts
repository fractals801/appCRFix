import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RichmRoutingModule } from './richm-routing.module';
import { PaganComponent } from './pagan/pagan.component';


@NgModule({
  declarations: [PaganComponent],
  imports: [
    CommonModule,
    RichmRoutingModule
  ]
})
export class RichmModule { }
