import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Routes }   from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from './shared/shared.module';
import { AboutComponent } from './modules/about/about.component';
import { InvalidFileTypeComponent } from './modules/invalid-file-type/invalid-file-type.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { SuccessPopUpComponent } from './modules/success-pop-up/success-pop-up.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { TeamComponent } from './modules/team/team.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    InvalidFileTypeComponent,
    SuccessPopUpComponent,

  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    DefaultModule,
    FlexLayoutModule,
    MatSidenavModule,
    FormsModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    MatExpansionModule,
    MatTooltipModule,
   SharedModule,
  HttpClientModule,
    RouterModule.forRoot([])
    
  
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    
  ]
})
export class AppModule { }
