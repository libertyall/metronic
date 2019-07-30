import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'club-form-timeline',
	templateUrl: './club-form-timeline.component.html',
	styleUrls: ['./club-form-timeline.component.scss']
})
export class ClubFormTimelineComponent implements OnInit {

	/* @Input() articles: IArticle[];
	 @Output() saveClub: EventEmitter<IClub> = new EventEmitter<IClub>(false);

	 public club: IClub;
	 public form: FormGroup;
	 public editEvent: ITimeLineEvent; */

	constructor(private route: ActivatedRoute) {
	}

	ngOnInit() {
		/* this.route.data.subscribe((data: { club: IClub }) => {
		 this.club = data.club;
		 }); */
	}

	/* saveTimeLineEvent($event: ITimeLineEvent): void {
	 this.club.timeLine ? this.club.timeLine.push($event) : this.club.timeLine = [$event];
	 this.saveClub.emit(this.club);
	 }

	 updateTimeLineEvent($event: ITimeLineEvent): void {
	 const idx = this.club.timeLine.indexOf(this.editEvent);
	 this.club.timeLine[idx] = $event;
	 this.saveClub.emit(this.club);
	 this.editEvent = null;
	 }

	 editTimeLineEvent($event: ITimeLineEvent): void {
	 this.editEvent = $event;
	 }

	 deleteTimeLineEvent($event: ITimeLineEvent): void {
	 console.log($event);
	 this.club.timeLine.splice(this.club.timeLine.indexOf($event), 1);
	 this.saveClub.emit(this.club);
	 }

	 cancelEditTimeLineEvent(): void {
	 delete this.editEvent;
	 } */
}
