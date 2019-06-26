import { Component, OnInit } from '@angular/core';
import { SubheaderService } from '../../../../core/_base/layout';

@Component({
	selector: 'kt-user-dashboard',
	templateUrl: './user-dashboard.component.html',
	styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

	constructor(private subheaderService: SubheaderService) {
	}

	ngOnInit(): void {
		this.subheaderService.setTitle('User management');
	}

}
