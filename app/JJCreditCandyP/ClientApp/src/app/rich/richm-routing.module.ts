import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaganComponent } from './pagan/pagan.component';

const routes: Routes = [ { path: 'pagan', component: PaganComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RichmRoutingModule { }
