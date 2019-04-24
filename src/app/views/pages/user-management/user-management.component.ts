import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
	selector: 'kt-user-management',
	templateUrl: './user-management.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserManagementComponent implements OnInit {


	constructor() {
	}

	ngOnInit() {
	}
}
