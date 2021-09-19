import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CompanyprofileComponent } from '../companyprofile/companyprofile.component';
import { CustomerprofileComponent } from '../customerprofile/customerprofile.component';
import { ServiceComponent } from '../service/service.component';
import { LoginComponent } from '../login/login.component';
//import { SidenavComponent } from '../sidenav/sidenav.component';
import { ProcessdepartComponent } from '../processdepart/processdepart.component';
import { IframecompComponent } from '../iframecomp/iframecomp.component';
import { RegisterComponent } from '../register/register.component';
import { UsermanagementComponent } from '../management/usermanagement/usermanagement.component';
import { MainPortalComponent } from '../portal/main-portal/main-portal.component';


const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'umanagement', component: UsermanagementComponent },
  { path: 'custprofile', component: CustomerprofileComponent },
  { path: 'services', component: ServiceComponent },
  { path: 'processdepart', component: ProcessdepartComponent },
  { path: 'about', component: IframecompComponent, data: { url: "https://www.jjfixyourcredit.com/#mediaj9dxjb6t25" } },
  { path: 'ciaprofile', component: CompanyprofileComponent },
  { path: 'mainportal', component: MainPortalComponent },
   { path: '**', component: LoginComponent, pathMatch: 'full' }];

@NgModule({
  //declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRountingModule { }
