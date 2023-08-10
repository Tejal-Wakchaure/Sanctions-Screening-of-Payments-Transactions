/*import { Component } from '@angular/core';

@Component({
  selector: 'app-validate-file',
  templateUrl: './validate-file.component.html',
  styleUrls: ['./validate-file.component.scss']
})
export class ValidateFileComponent {

}
*/


// sanction.component.ts
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UploadService } from '../upload.service';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-validate-file',
  templateUrl: './validate-file.component.html',
  styleUrls: ['./validate-file.component.scss']
})
export class ValidateFileComponent implements OnInit {
 
  filteredData: any;
 
  selectedFilter: string = '';
  selectedValidateFilter: string = '';
  selectedScreenFilter: string = '';
  tableHeaders: string[] = [];
  transactions: any;
  


  constructor(private http: HttpClient, private router: Router, private uploadService: UploadService) {
    this.uploadService.displayTransaction().subscribe((data) => {
      console.warn("data", data);
      this.transactions = data;
      this.filteredData = data; // Initialize filteredData with all data
      
    })
  }

  ngOnInit() { }

  // Function to apply background color based on 'Status'
  getCellClass(key: string, value: any): string {
    if (key === 'Status') {
      return value === 'PASS' ? 'PASS' : value === 'FAIL' ? 'FAIL' : '';
    }
    return '';
  }

  applyFilters() {
    // Filter based on the selected filter option
    if (this.selectedFilter === '') {
      this.filteredData = this.transactions; // No filter selected, show all the transactions
    } else if (this.selectedFilter === 'ValidPass') {
      this.filteredData = this.transactions.filter((data: { statusValidate: string }) => {
        return data.statusValidate === 'Pass';
      });
    } else if (this.selectedFilter === 'ValidFail') {
      this.filteredData = this.transactions.filter((data: { statusValidate: string }) => {
        return data.statusValidate === 'Fail';
      });
    } else if (this.selectedFilter === 'ScreenFail') {
      this.filteredData = this.transactions.filter((data: { statusScreen: string }) => {
        return data.statusScreen === 'Fail';
      });
    } else if (this.selectedFilter === 'ScreenPass') {
      this.filteredData = this.transactions.filter((data: { statusScreen: string }) => {
        return data.statusScreen === 'Pass';
      });
    }
  }


}
