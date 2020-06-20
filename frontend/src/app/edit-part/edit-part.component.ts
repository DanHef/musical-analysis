import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-edit-part-dialog',
    templateUrl: 'edit-part.dialog.html',
})
export class EditPartDialogComponent {
    description: string;
    tagDescription: string;
    tagId: number;
    tags;

    constructor(
        public dialogRef: MatDialogRef<EditPartDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data) {
            this.description = data.description;
            this.tagDescription = data.tagDescription;
            this.tagId = data.tagId;

            this.tags = data.tags;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
