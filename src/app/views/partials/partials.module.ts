import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CoreModule } from '../../core/core.module';
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
	Subheader1Component, Subheader2Component, Subheader3Component,
	UserProfileComponent,
} from './layout';
import { InlineSVGModule } from 'ng-inline-svg';
import { CartComponent } from './layout/topbar/cart/cart.component';
import { ErrorComponent } from './content/general/error/error.component';
import { RouterModule } from '@angular/router';

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
		ErrorComponent

		/* NoticeComponent,
		ActionNotificationComponent,
		DeleteEntityDialogComponent,
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
		ErrorComponent

		/*WidgetModule,
		PortletModule,
		NoticeComponent,
		ActionNotificationComponent,
		DeleteEntityDialogComponent,
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
		MatProgressSpinnerModule,
		NgbModule,
		PerfectScrollbarModule,
		InlineSVGModule,
		// Suheader-Includes
		RouterModule
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
		MatCardModule,
		MatPaginatorModule,
		MatSortModule,
		MatCheckboxModule,
		MatSnackBarModule,
		MatTabsModule,
		MatTooltipModule,
		MatDialogModule, */
	]
})
export class PartialsModule {
}
