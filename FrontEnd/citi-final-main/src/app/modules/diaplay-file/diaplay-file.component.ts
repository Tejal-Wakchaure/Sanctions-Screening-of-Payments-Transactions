import { Component, OnInit } from '@angular/core';
import { UploadService } from '../upload.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { SuccessPopUpComponent } from '../success-pop-up/success-pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { InvalidFileTypeComponent } from '../invalid-file-type/invalid-file-type.component';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-diaplay-file',
  templateUrl: './diaplay-file.component.html',
  styleUrls: ['./diaplay-file.component.scss']
})
export class DiaplayFileComponent implements OnInit {
 
  filteredData: any;
  selectedFilter: string = '';
  transactions : any;
  file : any;
  fileForm: FormGroup;
  errorMessage: string = '';
 
  isdisable: boolean = false;

  SUrl = "http://localhost:8092/sanctionScreening";


  constructor(private cdRef: ChangeDetectorRef,private http: HttpClient, private router: Router, private uploadService: UploadService, private dialog: MatDialog ) { 
    this.uploadService.displayTransaction().subscribe((data) =>{
      console.warn("data" , data);
      this.transactions = data;
      this.filteredData = data; // Initialize filteredData with all data
    
    })

    this.fileForm = new FormGroup({
      file: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
   // const storedIsDisable = localStorage.getItem('isdisable');
   // this.isdisable = storedIsDisable === 'false';
  }
   
  ScreenData() {
   
    this.http.get('http://localhost:8092/sanctionScreening', { responseType: 'text' }).subscribe(
      (response: any) => {
        if (response === 'success') {
       //   this.isScreeningDone = true; // Set the flag to true when screening is successful
          
          const dialogRef = this.dialog.open(SuccessPopUpComponent, {
            width: '250px',
            data: 'File Screening done Successfully!.',
          });
  
          dialogRef.afterClosed().subscribe(() => {
            const navigationExtras: NavigationExtras = {
              skipLocationChange: true,
            };
  
            this.router.navigate(['/Display'], navigationExtras).then(() => {
           //   this.isdisable = true; // Disable the button after successful screening

              // Store the 'isdisable' state in local storage
           //   localStorage.setItem('isdisable', 'true');
              window.location.reload();
            });
          });   
        } 

        
    else {
      // File is not selected or is empty, show an error message
      const dialogRef = this.dialog.open(InvalidFileTypeComponent, {
        width: '250px',
        data: 'File is not Uploaded and hence not Validated!',
      });
      return;
    }

       
      },
      (error: any) => {
        const dialogRef = this.dialog.open(InvalidFileTypeComponent, {
          width: '250px',
          data: 'Error in Screening!.',
        });}
    );
  }
 
/*
  applyValidFilters() {
    console.log('Selected Filter:', this.selectedFilter);
    if (this.selectedFilter === '') {
      this.filteredData = this.transactions; // No filter selected, show all the transactions
    } else {
      this.filteredData = this.transactions.filter((data: { statusValidate: string }) => {
        if (typeof data.statusValidate === 'string') {
          return data.statusValidate === this.selectedFilter;
        } else {
          // Handle cases where data.statusValidate is not a string or is undefined
          return false;
        }
      });
    }
  }

  applyScreenFilters() {
    console.log('Selected Filter:', this.selectedFilter);
    if (this.selectedFilter === '') {
      this.filteredData = this.transactions; // No filter selected, show all the transactions
    } else {
      this.filteredData = this.transactions.filter((data: { statusScreen: string }) => {
        if (typeof data.statusScreen === 'string') {
          return data.statusScreen === this.selectedFilter;
        } else {
          // Handle cases where data.statusValidate is not a string or is undefined
          return false;
        }
      });
    }
  }*/
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
  archiveData() {
    console.log("Archiving...");
    this.http.get('http://localhost:8092/archiveResults', { responseType: 'text' }).subscribe(
      (response: any) => {
        if (response === 'success') {

          const dialogRef = this.dialog.open(SuccessPopUpComponent, {
            width: '250px',
            data: 'Archived Successfully in \nDocuments:\CitiBridgeProject23',
          });
        
          const navigationExtras: NavigationExtras = {
            skipLocationChange: true
          };
        }
      },
      (error: any) => {
        const dialogRef = this.dialog.open(InvalidFileTypeComponent, {
          width: '250px',
          data: 'Error in Archive!.',
        });
      }
    );
  }

  applySearch(event: KeyboardEvent) {
    let searchTerm = (event.target as HTMLInputElement).value;
    if (!searchTerm) {
      this.filteredData = this.transactions; // No search term, show all the table data
    } else {
      searchTerm = searchTerm.toLowerCase();
      this.filteredData = this.transactions.filter((data: any) => {
        return Object.values(data).some((value) => {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(searchTerm);
          } else {
            // Handle cases where value is not a string or is undefined
            return false;
          }
        });
      });
    }
  }


}