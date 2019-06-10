import { KtDialogService } from './../../../../../core/_base/layout';
import { AfterViewInit, Component, ElementRef, HostBinding, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
	selector: 'kt-portlet-header',
	styleUrls: ['portlet-header.component.scss'],
	template: `<div class="kt-portlet__head-label" [hidden]="noTitle">
			<span class="kt-portlet__head-icon" #refIcon [hidden]="hideIcon">
				<ng-content *ngIf="!icon" select="[ktPortletIcon]"></ng-content>
				<i *ngIf="icon" [ngClass]="icon"></i>
			</span>
			<ng-content *ngIf="!title" select="[ktPortletTitle]"></ng-content>
			<h3 *ngIf="title" class="kt-portlet__head-title" [innerHTML]="title"></h3>
		</div>
		<div class="kt-portlet__head-toolbar" #refTools [hidden]="hideTools">
			<ng-content select="[ktPortletTools]"></ng-content>
		</div>`
})
export class PortletHeaderComponent implements OnInit, AfterViewInit, OnDestroy {

	@Input() class: string;
	@Input() title: string;
	@Input() icon: string;
	@Input() noTitle: boolean;
	@Input() sticky: boolean;
	@Input() viewLoading$: Observable<boolean>;
	viewLoading: boolean = false;

	@HostBinding('class') classes: string = 'kt-portlet__head';

	@ViewChild('refIcon', {static: true}) refIcon: ElementRef;
	hideIcon: boolean;

	@ViewChild('refTools', {static: true}) refTools: ElementRef;
	hideTools: boolean;

	private subscriptions: Subscription[] = [];

	constructor(private el: ElementRef, private ktDialogService: KtDialogService) {
	}

	ngOnInit() {
		this.classes += this.class ? ' ' + this.class : '';
	}

	ngAfterViewInit(): void {
		if (this.viewLoading$) {
			const loadingSubscription = this.viewLoading$.subscribe(res => this.toggleLoading(res));
			this.subscriptions.push(loadingSubscription);
		}
		this.hideIcon = this.refIcon.nativeElement.children.length === 0;
		this.hideTools = this.refTools.nativeElement.children.length === 0;
	}

	toggleLoading(_incomingValue: boolean) {
		this.viewLoading = _incomingValue;
		if (_incomingValue && !this.ktDialogService.checkIsShown()) {
			this.ktDialogService.show();
		}

		if (!this.viewLoading && this.ktDialogService.checkIsShown()) {
			this.ktDialogService.hide();
		}
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(sb => sb.unsubscribe());
	}
}
