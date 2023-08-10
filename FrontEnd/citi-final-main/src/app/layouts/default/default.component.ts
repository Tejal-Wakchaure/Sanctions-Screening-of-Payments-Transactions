import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  sideBarOpen = true;
  uploadedFileName: string | null = null;
  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe((result) => {
      this.sideBarOpen = !result.matches;
    });
  }

  toggleSideBar() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  onFileUploaded(fileName: string) {
    this.uploadedFileName = fileName;
  }
 
}
