import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/modules/upload.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  uploadedFileName: string | null = null;
  isFileUploaded: boolean = false;
  isDataValidated: boolean = false; // Add a new variable to track validation status

  constructor(private uploadService: UploadService) {}

  ngOnInit() {
}
}