// Angular
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'kt-alert',
	templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit {
	// Public properties
	@Input() type: 'primary | secondary | success | warning | danger | info | light | dark';
	@Input() duration: number = 0;
	@Input() showCloseButton: boolean = true;
	@Output() close = new EventEmitter<boolean>();
	alertShowing: boolean = true;

	ngOnInit() {
		if (this.duration === 0) {
			return;
		}

		setTimeout(() => {
			this.closeAlert();
		}, this.duration);
	}

	closeAlert() {
		this.close.emit();
	}
}
