import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Sponsor} from '../../_model/sponsor.class';
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {EventEmitterService} from "../../../../shared/services/event-emitter.service";
// import { MediaItemService } from '../../../../shared/services/media/media-item.service';
// import { IMediaItem } from '../../../../shared/interfaces/media/media-item.interface';

// const SMALL_WIDTH_BREAKPOINT = 960;

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'sponsor-item',
	templateUrl: './sponsor-item.component.html',
	styleUrls: ['./sponsor-item.component.scss']
})
export class SponsorItemComponent implements OnInit {

	@Input() sponsor: Sponsor;
	// @Output() removeSponsor: EventEmitter<Sponsor> = new EventEmitter<Sponsor>(false);

	// @ViewChild(PerfectScrollbarDirective, {static: false}) directiveScroll: PerfectScrollbarDirective;
	// public mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

	// public config: PerfectScrollbarConfigInterface = {};

	sponsorLogo$: Observable<string>;
	contactImage$: Observable<string>;

	maxDescriptionLength: 120;

	constructor(private eventEmitterService: EventEmitterService,
				/*private mediaItemService: MediaItemService*/) {
	}

	ngOnInit() {
		if (this.sponsor && !this.sponsorLogo$) {
			// this.sponsorLogo = this.mediaItemService.getCurrentImage(['sponsors', 'profile'], this.sponsor.id);
			this.sponsorLogo$ = of(null).pipe(
				map(() => 'https://img.fcbayern.com/image/fetch/f_auto,h_768,q_auto:good,w_1366/https://fcbayern.com/binaries/content/' +
					'gallery/fc-bayern/homepage/saison-19-20/frauen/spiele/emiratescup_fcb_280719.jpg/emiratescup_' +
					'fcb_280719.jpg/fcbhippo%3Axtralargesixteentonine%3Fv%3D1564322518668')
			);
		}

		this.contactImage$ = of('https://img.fcbayern.com/image/fetch/f_auto,h_768,q_auto:good,w_1366/https://fcbayern.com/binaries/content' +
			'/gallery/fc-bayern/homepage/saison-19-20/frauen/spiele/emiratescup_fcb_280719.jpg/emiratescup_fcb_280719.jpg/' +
			'fcbhippo%3Axtralargesixteentonine%3Fv%3D1564322518668');
	}

	removeSponsor(sponsor: Sponsor): void {
		this.eventEmitterService.emitValue({
			action: 'delete',
			type: 'sponsors',
			entity: sponsor
		});
	}

}
