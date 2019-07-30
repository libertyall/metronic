import { Component, OnInit } from '@angular/core';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'club-form-management',
	templateUrl: './club-form-management.component.html',
	styleUrls: ['club-form-management.component.scss']
})
export class ClubFormManagementComponent implements OnInit {

	/* @Input() members: IMember[];
	 @Input() positions: ICategory[];
	 @Input() showLinks: boolean;
	 @Output() saveClub: EventEmitter<IClub> = new EventEmitter<IClub>(false);

	 public showForm = false;
	 public selectedPosition: IClubManagement;
	 */
	constructor() {
	}

	ngOnInit() {
	}

	/* toggleForm() {
		this.showForm = !this.showForm;
	}

	editManagementPosition($event: IClubManagement) {
		this.showForm = true;
		this.selectedPosition = $event;
	}

	cancel() {
		this.selectedPosition = null;
		this.toggleForm();
	} */
}
