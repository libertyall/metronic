import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule, MatProgressBarModule, MatProgressSpinnerModule, MatSnackBarModule} from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {CoreModule} from '../../core/core.module';
import {
	LanguageSelectorComponent,
	NotificationComponent,
	QuickActionComponent,
	QuickPanelComponent,
	ScrollTopComponent,
	SearchDropdownComponent,
	SearchResultComponent,
	SplashScreenComponent,
	StickyToolbarComponent,
	Subheader1Component,
	Subheader2Component,
	Subheader3Component,
	UserProfileComponent,
} from './layout';
import {InlineSVGModule} from 'ng-inline-svg';
import {CartComponent} from './layout/topbar/cart/cart.component';
import {ErrorComponent} from './content/general/error/error.component';
import {RouterModule} from '@angular/router';
import {DeleteEntityDialogComponent} from './content/crud';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
	declarations: [
		ScrollTopComponent,
		SplashScreenComponent,
		QuickPanelComponent,
		StickyToolbarComponent,

		// topbar components
		SearchDropdownComponent,
		SearchResultComponent,
		QuickActionComponent,
		NotificationComponent,
		CartComponent,
		LanguageSelectorComponent,
		UserProfileComponent,
		Subheader1Component,
		Subheader2Component,
		Subheader3Component,
		ErrorComponent,

		DeleteEntityDialogComponent,
		/* NoticeComponent,
		ActionNotificationComponent,
		FetchEntityDialogComponent,
		UpdateStatusDialogComponent,
		AlertComponent,

		ContextMenu2Component,
		ContextMenuComponent,
		NotificationComponent,
		SearchDefaultComponent,
		UserProfile2Component, */
	],
	exports: [
		ScrollTopComponent,
		SplashScreenComponent,
		QuickPanelComponent,
		StickyToolbarComponent,
		SearchDropdownComponent,
		SearchResultComponent,
		QuickActionComponent,
		NotificationComponent,
		CartComponent,
		LanguageSelectorComponent,
		UserProfileComponent,
		Subheader1Component,
		Subheader2Component,
		Subheader3Component,
		ErrorComponent,
		DeleteEntityDialogComponent,

		/*WidgetModule,
		PortletModule,
		NoticeComponent,
		ActionNotificationComponent,
		FetchEntityDialogComponent,
		UpdateStatusDialogComponent,
		AlertComponent,

		// topbar components
		ContextMenu2Component,
		ContextMenuComponent,
		SearchDefaultComponent,
		UserProfile2Component, */
	],
	imports: [
		CommonModule,
		CoreModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		NgbModule,
		PerfectScrollbarModule,
		InlineSVGModule,
		// Suheader-Includes
		RouterModule,
		MatDialogModule,
		MatSnackBarModule,
		TranslateModule.forChild()
		/* FormsModule,
		ReactiveFormsModule,
		PortletModule,
		WidgetModule,
		MatButtonModule,
		MatMenuModule,
		MatSelectModule,
		MatInputModule,
		MatTableModule,
		MatAutocompleteModule,
		MatRadioModule,
		MatIconModule,
		MatNativeDateModule,
		MatProgressBarModule,
		MatDatepickerModule,
		MatCardModule,,
		MatCheckboxModule,
		MatTabsModule,
		MatTooltipModule, */
	],
	entryComponents: [
		DeleteEntityDialogComponent
	]
})
export class PartialsModule {
}
