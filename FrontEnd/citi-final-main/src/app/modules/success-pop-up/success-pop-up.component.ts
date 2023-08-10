import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-pop-up',
  templateUrl: './success-pop-up.component.html',
  styleUrls: ['./success-pop-up.component.scss']
})
export class SuccessPopUpComponent {


constructor(
  public dialogRef: MatDialogRef<SuccessPopUpComponent >,
  @Inject(MAT_DIALOG_DATA) public resultMessage: string
) {}

close(): void {
  this.dialogRef.close();
}
}