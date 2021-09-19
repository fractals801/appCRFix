import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MatMomentDateModule, MomentDateAdapter } from "@angular/material-moment-adapter";
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { AppRountingModule } from './app-rounting/app-rounting.module';
import { CompanyprofileComponent } from './companyprofile/companyprofile.component';
import { CustomerprofileComponent } from './customerprofile/customerprofile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CrudmenuComponent } from './crudmenu/crudmenu.component';
//import { tstComponent} from './tst/tst.component'; 

import { UploadCompComponent } from './UploadComp/upload-comp.component';
import { AgGridModule } from 'ag-grid-angular';
import { XdatepickerComponent } from './gridrendercomp/xdatepicker/xdatepicker.component';
import { XtextareaComponent } from './gridrendercomp/xtextarea/xtextarea.component';
import { XbuttonComponent } from './gridrendercomp/xbutton/xbutton.component';
import { CustomergridComponent } from './customerprofile/customergrid/customergrid.component';
import { FollowsgridComponent } from './customerprofile/followsgrid/followsgrid.component';
import { ServiceComponent } from './service/service.component';
import { ServiceGridComponent } from './service/service-grid/service-grid.component';
import { ServicegridtranComponent } from './service/servicegridtran/servicegridtran.component';
import { ProcessdepartComponent } from './processdepart/processdepart.component';
import { ProcessGridComponent } from './processdepart/process-grid/process-grid.component';
import { ProcessgridtranComponent } from './processdepart/processgridtran/processgridtran.component';
import { CustomerpersonalinfoComponent } from './customerprofile/customerpersonalinfo/customerpersonalinfo.component';
import { CustomerdemograComponent } from './customerprofile/customerdemogra/customerdemogra.component';

import { LoginComponent } from './login/login.component';

import { IframecompComponent } from './iframecomp/iframecomp.component';
import { CiagridComponent } from './companyprofile/ciagrid/ciagrid.component';
import { CiaprofComponent } from './companyprofile/ciaprof/ciaprof.component';
import { RegisterComponent } from './register/register.component';
import { Dialog1Component } from './dialog1/dialog1.component';
import { Dialog2Component } from './dialog2/dialog2.component';
import { RichmModule } from './rich/richm.module';
import { ManagementComponent } from './management/management.component';
import { UsermanagementComponent } from './management/usermanagement/usermanagement.component';
import { UsergridComponent } from './management/usermanagement/usergrid/usergrid.component';
import { ValidpassDirective } from './directivas/validpass.directive';
import { SetupuserpassComponent } from './register/setupuserpass/setupuserpass.component';
import { MainPortalComponent } from './portal/main-portal/main-portal.component';
import { PcustomerComponent } from './portal/pcustomer/pcustomer.component';
import { PscoreComponent } from './portal/pcustomer/pscore/pscore.component';
import { PdocumentComponent } from './portal/pcustomer/pdocument/pdocument.component';
import { PdisputeComponent } from './portal/pcustomer/pdispute/pdispute.component';
import { PtaskComponent } from './portal/pcustomer/ptask/ptask.component';
import { PmemoComponent } from './portal/pcustomer/pmemo/pmemo.component';
import { PinvoicesComponent } from './portal/pcustomer/pinvoices/pinvoices.component';
//import { AgChartsAngularModule } from 'ag-charts-angular';



export const options: Partial<IConfig> = {
  thousandSeparator: "'"
};


@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    CompanyprofileComponent,
    CrudmenuComponent,
    CustomerprofileComponent,
    UploadCompComponent,
    XdatepickerComponent,
    XtextareaComponent,
    XbuttonComponent,
    CustomergridComponent,
    FollowsgridComponent,
    ServiceComponent,
    ServiceGridComponent,
    CustomerpersonalinfoComponent,
    CustomerdemograComponent,
    ServicegridtranComponent,
    LoginComponent,
    ProcessdepartComponent,
    ProcessGridComponent,
    ProcessgridtranComponent,
    IframecompComponent,
    CiagridComponent,
    CiaprofComponent,
    RegisterComponent,
    Dialog1Component,
    Dialog2Component,
    ManagementComponent,
    UsermanagementComponent,
    UsergridComponent,
    ValidpassDirective,
    SetupuserpassComponent,
    MainPortalComponent,
    PcustomerComponent,
    PscoreComponent,
    PdocumentComponent,
    PdisputeComponent,
    PtaskComponent,
    PmemoComponent,
    PinvoicesComponent   
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    MatMomentDateModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    NgxMaskModule.forRoot(options),
    HttpClientModule,
    AgGridModule.withComponents([]),
    RichmModule,
    AppRountingModule
    
  ],
  //{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  providers: [],
  entryComponents:[],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor() { }
}

