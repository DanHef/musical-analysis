import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-edit-part-dialog',
    templateUrl: 'edit-part.dialog.html',
})
export class EditPartDialogComponent {
    componentData;
    tags;

    constructor(
        public dialogRef: MatDialogRef<EditPartDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data) {
        this.componentData = data;

        this.tags = data.tags;
    }


    public onNoClick(): void {
        this.dialogRef.close();
    }
}
