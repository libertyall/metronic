import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
	selector: 'kt-delete-entity-dialog',
	templateUrl: './delete-entity-dialog.component.html'
})
export class DeleteEntityDialogComponent implements OnInit {
	viewLoading: boolean = false;

	constructor(public dialogRef: MatDialogRef<DeleteEntityDialogComponent>,
				@Inject(MAT_DIALOG_DATA) public data: {
					description: string;
					waitDescription: string;
					title: string
				}
	) {
	}

	ngOnInit() {
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	onYesClick(): void {
		this.dialogRef.close(true);
	}
}
