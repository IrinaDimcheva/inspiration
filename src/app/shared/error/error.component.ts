import { Component, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  message = 'An unknown error occurred!';
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }, public dialogRef: MatDialogRef<any>) { }

  closeDialog() {
    this.dialogRef.close();
  }
}
