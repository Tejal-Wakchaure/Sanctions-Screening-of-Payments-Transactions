import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { TeamComponent } from 'src/app/modules/team/team.component';
import { UploadComponent } from 'src/app/modules/upload/upload.component';
import { UploadService } from 'src/app/modules/upload.service';
import { SanctionComponent } from 'src/app/modules/sanction/sanction.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatDialogModule } from '@angular/material/dialog';
import { DiaplayFileComponent } from 'src/app/modules/diaplay-file/diaplay-file.component';
import { ValidateFileComponent } from 'src/app/modules/validate-file/validate-file.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterLinkActive } from '@angular/router';
@NgModule({
  declarations: [
    DefaultComponent,
    UploadComponent,
    SanctionComponent,
    DiaplayFileComponent,
    ValidateFileComponent,
    TeamComponent

  ],
  imports: [
    CommonModule,
    RouterLinkActive,
    HttpClientModule,
    MatDialogModule,
    Ng2SearchPipeModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    SharedModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatGridListModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],providers: [
    UploadService
  ]
})
export class DefaultModule { }
 