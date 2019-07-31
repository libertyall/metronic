import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Club} from "../../../_model/club.model";
import {ActivatedRoute} from "@angular/router";

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'honorary-form-list',
	templateUrl: './honorary-form-list.component.html',
	styleUrls: ['./honorary-form-list.component.scss']
})
export class HonoraryFormListComponent implements OnInit {

	club: Club;
	articles = [];
	members = [];

	@Output() deleteHonorary: EventEmitter<number> = new EventEmitter<number>(false);

	constructor(private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.route.parent.data.subscribe((data: { club: Club }) => {
			this.club = data.club;
			// this.members$ = this.memberService.getHonoraryList(this.club);
		});
	}

}
