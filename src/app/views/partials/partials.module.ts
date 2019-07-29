import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatProgressBarModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CoreModule } from '../../core/core.module';
import {
	LanguageSelectorComponent, NotificationComponent, QuickActionComponent, QuickPanelComponent, ScrollTopComponent,
	SearchDropdownComponent, SearchResultComponent, Subheader1Component, Subheader2Component, Subheader3Component,
	UserProfileComponent
} from './layout';
import { InlineSVGModule } from 'ng-inline-svg';
import { ErrorComponent } from './content/general/error/error.component';
import { RouterModule } from '@angular/router';
import {
	ActionNotificationComponent, AlertComponent, DeleteEntityDialogComponent, UpdateStatusDialogComponent
} from './content/crud';
import { TranslateModule } from '@ngx-translate/core';
import { Subheader4Component } from './layout/subheader/subheader4/subheader4.component';
import { Subheader5Component } from './layout/subheader/subheader5/subheader5.component';
import { NgPipesModule } from 'ngx-pipes';
import { NoticeComponent } from './content/general/notice/notice.component';

@NgModule({
	declarations: [
		QuickPanelComponent,
		ScrollTopComponent,
		SearchDropdownComponent,
		Subheader1Component,
		Subheader2Component,
		Subheader3Component,
		Subheader4Component,
		Subheader5Component,
		SearchResultComponent,
		NotificationComponent,
		QuickActionComponent,
		LanguageSelectorComponent,
		UserProfileComponent,
		ErrorComponent,
		AlertComponent,
		ActionNotificationComponent,
		DeleteEntityDialogComponent,
		NoticeComponent,
		UpdateStatusDialogComponent,
		NotificationComponent
	],
	exports: [
		NgPipesModule,
		QuickPanelComponent,
		ScrollTopComponent,
		SearchDropdownComponent,
		Subheader1Component,
		Subheader2Component,
		Subheader3Component,
		Subheader4Component,
		Subheader5Component,
		SearchResultComponent,
		NotificationComponent,
		QuickActionComponent,
		LanguageSelectorComponent,
		UserProfileComponent,
		ErrorComponent,
		AlertComponent,
		ActionNotificationComponent,
		DeleteEntityDialogComponent
	],
	imports: [
		CommonModule,
		CoreModule,
		InlineSVGModule,
		MatButtonModule,
		MatIconModule,
		MatProgressBarModule,
		NgbModule,
		PerfectScrollbarModule,
		TranslateModule.forChild(),
		RouterModule
	],
	entryComponents: [
		ActionNotificationComponent,
		DeleteEntityDialogComponent
	]
})
export class PartialsModule {
}
