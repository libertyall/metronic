import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Club } from '../../_model/club.model';
import { ClubHonorary } from '../../_model/club-honorary.class';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'club-form-honoraries',
	templateUrl: './club-form-honoraries.component.html'
})
export class ClubFormHonorariesComponent implements OnInit {

	club: Club;
	// @Input() articles: IArticle;
	// @Input() members$: Observable<IMember[]>;

	constructor(// private memberService: MemberService,
		private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.route.parent.data.subscribe((data: { club: Club }) => {
			this.club = data.club;
			// this.members$ = this.memberService.getHonoraryList(this.club);
		});
	}

	createHonorary($event: ClubHonorary) {
		console.log('create or edit Honorary', $event);
		this.club.honoraries.push($event);
	}

	deleteHonorary($event: number): void {
		this.club.honoraries.splice($event, 1);
	}

}
