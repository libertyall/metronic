import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBar} from '@angular/material';
import { delay } from 'rxjs/operators';
import { of } from 'rxjs';
import {MessageType} from "../../../../../core/_base/crud";

@Component({
	selector: 'kt-action-natification',
	templateUrl: './action-notification.component.html',
	changeDetection: ChangeDetectionStrategy.Default

})
export class ActionNotificationComponent implements OnInit {

	constructor(@Inject(MAT_SNACK_BAR_DATA) public data: {
		color: string;
		showUndoButton: boolean;
		duration: number;
		undoButtonDuration: number;
		snackBar: MatSnackBar;
		message: string;
		type: MessageType;
		showCloseButton: boolean;
		verticalPosition: string;
	}) {
	}

	ngOnInit() {
		if (!this.data.showUndoButton || (this.data.undoButtonDuration >= this.data.duration)) {
			return;
		}

		this.delayForUndoButton(this.data.undoButtonDuration).subscribe(() => {
			this.data.showUndoButton = false;
		});
	}

	delayForUndoButton(timeToDelay) {
		return of('').pipe(delay(timeToDelay));
	}

	onDismissWithAction() {
		this.data.snackBar.dismiss();
	}

	public onDismiss() {
		this.data.snackBar.dismiss();
	}
}
