import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {SubheaderService} from '../../../../../core/_base/layout';
import {Breadcrumb} from '../../../../../core/_base/layout/services/subheader.service';

@Component({
	selector: 'kt-subheader2',
	templateUrl: './subheader2.component.html',
	styleUrls: ['./subheader2.component.scss']
})
export class Subheader2Component implements OnInit, OnDestroy, AfterViewInit {

	today: number = Date.now();
	title: string = '';
	desc: string = '';
	showToolbar: boolean = true;
	breadcrumbs: Breadcrumb[] = [];
	link: {
		url?: string;
		title?: string;
	};

	private subscriptions: Subscription[] = [];

	constructor(public subheaderService: SubheaderService) {
	}

	ngOnInit() {
	}

	ngAfterViewInit(): void {
		this.subscriptions.push(this.subheaderService.title$.subscribe(bt => {
			if (bt) {
				// console.log(bt);
				Promise.resolve(null).then(() => {
					this.title = bt.title;
					this.desc = bt.desc;
					this.showToolbar = bt.showToolbar;
					this.link = bt.link;
				});
			}
		}));

		this.subscriptions.push(this.subheaderService.breadcrumbs$.subscribe(bc => {
			// Promise.resolve(null).then(() => {
			this.breadcrumbs = bc;
			// });
		}));
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(sb => sb.unsubscribe());
	}
}
