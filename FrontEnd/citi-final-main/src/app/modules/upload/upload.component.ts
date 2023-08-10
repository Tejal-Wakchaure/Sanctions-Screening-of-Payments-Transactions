import { Component, ViewChild, ElementRef , Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { UploadService } from '../upload.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { InvalidFileTypeComponent } from '../invalid-file-type/invalid-file-type.component';
import { HttpClient } from '@angular/common/http';
import { SuccessPopUpComponent } from '../success-pop-up/success-pop-up.component';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  excelData: any[] = [];
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @Output() fileUploaded: EventEmitter<string> = new EventEmitter<string>();

  file : any;
  fileForm: FormGroup;
  invalidFileType: boolean = false;
  selectedFileName: string | null = null;
  errorMessage: string = '';
 // UploadService: any;
  uploadCompleted: boolean = false;

  fileUploadUrl = "http://localhost:8092/uploadfile";


  constructor(private _http: HttpClient, private router: Router, private uploadService: UploadService ,  private dialog: MatDialog ) {
    this.fileForm = new FormGroup({
      file: new FormControl('', Validators.required),
    });
  }


  onFileSelected(event: any) 

  {
    const inp=event.target as HTMLInputElement;
    this.file=inp.files;
    console.log(this.file);

    
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    if (files && files.length > 0) {
      const file = files[0];
  
      if (file && file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        // Invalid file type, clear the selected file and show the error message
        this.clearFileSelection(inputElement);
  
        // Open the dialog with the error message
        const dialogRef = this.dialog.open(InvalidFileTypeComponent, {
          width: '250px',
          data: 'Invalid file type! Please choose an xlsx file.',
        });
      } else {
        this.invalidFileType = false;
        this.selectedFileName = file.name;

        // Call the method to update the file upload status in the UploadService
        this.onFileSelectedSuccess(event);
      }
    }
  }
/* 
  /*{
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const data = new Uint8Array(fileReader.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetNames = workbook.SheetNames;
      this.excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);
      console.log(this.excelData);
    };
    fileReader.readAsArrayBuffer(file);

    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    if (files && files.length > 0) {
      const file = files[0];
  
      if (file && file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        // Invalid file type, clear the selected file and show the error message
        this.clearFileSelection(inputElement);
  
        // Open the dialog with the error message
        const dialogRef = this.dialog.open(InvalidFileTypeComponent, {
          width: '250px',
          data: 'Invalid file type! Please choose an xlsx file.',
        });
      } else {
        this.invalidFileType = false;
        this.selectedFileName = file.name;

        // Call the method to update the file upload status in the UploadService
        this.onFileSelectedSuccess(event);
      }
    }
  }*/

  

  clearFileSelection(fileInput: any) {
    this.fileForm.patchValue({ file: null });
    this.selectedFileName = null;
    this.invalidFileType = false;
    this.excelData = []; // Clear excel data
    console.clear(); // Clear the console
    fileInput.value = ''; // Clear the file input value
  }

  /*uploadFile() {
    if (this.excelData && this.excelData.length > 0) {
      this.uploadService.setExcelData(this.excelData);
      // Set the button pressed status to true
      this.uploadService.setButtonPressedStatus(true);


   // Navigate to the screening page
      this.router.navigate(['/Display']);

    } else if (!this.excelData || this.excelData.length === 0) {
      const dialogRef = this.dialog.open(InvalidFileTypeComponent, {
        width: '250px',
        data: 'Please choose an xlsx file.',
      })
    } 
  }*/


  uploadFile(){

    if (!this.file || this.file.length === 0) {
      // File is not selected or is empty, show an error message
      const dialogRef = this.dialog.open(InvalidFileTypeComponent, {
        width: '250px',
        data: 'Please upload an excel file.',
      });
      return;
    }
    let formData = new FormData();
 //   formData.append("file",this.file[0]);
   // console.log(formData.get("file"));
   formData.append('file',this.file[0]);
   this._http.post(this.fileUploadUrl,formData).subscribe(
    {
      next: () => {
        const dialogRef = this.dialog.open(SuccessPopUpComponent, {
          width: '250px',
          data: 'File Validated Succesfully',
        });
       this.uploadCompleted = true;

       dialogRef.afterClosed().subscribe(() => {
        this.router.navigate(['/Display']);
      });
     //   this.router.navigate(['/Display']);
      },
      error: () => {
        const dialogRef = this.dialog.open(InvalidFileTypeComponent, {
          width: '250px',
          data: 'Please select file with proper data Format!',
        });
        this.uploadCompleted = false;
      }

/*      next: data=>alert("File uploaded Successfully!"),
      error: error=>alert("Please Select the File with Proper Validations!")
      */ 
    }
   );
  
   
  }

  onFileSelectedSuccess(event: any) 
   {
    const file: File | null = event.target.files[0] || null;
    
    if (file) {
      // Assuming the file upload is successful, update the status in the service.
      this.uploadService.setFileUploadedStatus(true);
      // Set the uploadedFileName in the service for the SidebarComponent
    } else {
      this.uploadService.setFileUploadedStatus(false);
    }
  }

  
}
