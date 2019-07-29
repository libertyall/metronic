import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventEmitterService} from "../../../shared/services/event-emitter.service";
import {Subscription} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {LayoutUtilsService, MessageType} from "../../../core/_base/crud";

@Component({
	selector: 'kt-sponsors',
	templateUrl: './sponsors.component.html',
	styleUrls: ['./sponsors.component.scss']
})
export class SponsorsComponent implements OnInit, OnDestroy {

	private sub: Subscription;

	constructor(private translateService: TranslateService,
				private layoutUtilsService: LayoutUtilsService,
				private eventEmitterService: EventEmitterService) {
	}

	ngOnInit(): void {
		this.sub = this.eventEmitterService.dataStr.subscribe((data: { action: string; type: string, entity: any }) => {
			// if (data.type === 'sponsor') {
			let _title;
			let _description;
			let _waitDescription;
			let _deleteMessage;

			switch (data.action) {
				case 'delete':
					_title = this.translateService.instant(data.type + '.delete.title', {title: data.entity.title});
					_description = this.translateService.instant(data.type + '.delete.question');
					_waitDescription = this.translateService.instant(data.type + '.delete.waitDescription', {title: data.entity.title});
					_deleteMessage = this.translateService.instant(data.type + '.delete.success');
					break;
				case 'deleteAll':
					_title = this.translateService.instant(data.type + '.deleteAll.title');
					_description = this.translateService.instant(data.type + '.deleteAll.question');
					_waitDescription = this.translateService.instant(data.type + '.deleteAll.waitDescription');
					_deleteMessage = this.translateService.instant(data.type + '.deleteAll.success');
					break;
			}

			const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDescription);
			dialogRef.afterClosed().subscribe(res => {
				if (!res) {
					return;
				}
				this.layoutUtilsService.showActionNotification(_deleteMessage, 'success', MessageType.Delete);
			});

			// }
		});
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}

}
