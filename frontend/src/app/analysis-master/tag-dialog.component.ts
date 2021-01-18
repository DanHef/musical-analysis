import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TagData } from "./analysis-master.component";

@Component({
    selector: 'tag-dialog',
    templateUrl: 'tag-dialog.component.html',
  })
  export class TagDialog {
    newTagName: '';

    constructor(
      public dialogRef: MatDialogRef<TagDialog>,
      @Inject(MAT_DIALOG_DATA) public data: TagData) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
}