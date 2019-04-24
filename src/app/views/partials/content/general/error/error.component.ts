import { Component, HostBinding, Input } from '@angular/core';

@Component({
	selector: 'kt-error',
	templateUrl: './error.component.html',
	styleUrls: ['./error.component.scss']
})
export class ErrorComponent {

	@Input() type: string = 'error-v1';
	@Input() image: string;
	@Input() code: string = '404';
	@Input() title: string;
	@Input() subtitle: string;
	@Input() desc: string = 'Oops! Something went wrong!';
	@Input() return: string = 'Return back';

	@HostBinding('class') classes: string = 'kt-grid kt-grid--ver kt-grid--root';
}
