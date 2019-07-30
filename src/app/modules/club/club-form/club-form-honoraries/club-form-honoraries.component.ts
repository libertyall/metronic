import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Club} from "../../_model/club.model";

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

}
