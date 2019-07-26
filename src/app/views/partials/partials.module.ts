import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	MatButtonModule, MatDialogModule, MatIconModule, MatProgressBarModule, MatProgressSpinnerModule, MatSnackBarModule
} from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CoreModule } from '../../core/core.module';
import {
	LanguageSelectorComponent, NotificationComponent, QuickActionComponent, QuickPanelComponent, ScrollTopComponent,
	SearchDropdownComponent, SearchResultComponent, SplashScreenComponent, StickyToolbarComponent, Subheader1Component,
	Subheader2Component, Subheader3Component, UserProfileComponent
} from './layout';
import { InlineSVGModule } from 'ng-inline-svg';
import { CartComponent } from './layout/topbar/cart/cart.component';
import { ErrorComponent } from './content/general/error/error.component';
import { RouterModule } from '@angular/router';
import { ActionNotificationComponent, AlertComponent, DeleteEntityDialogComponent } from './content/crud';
import { TranslateModule } from '@ngx-translate/core';
import {Subheader4Component} from './layout/subheader/subheader4/subheader4.component';
import {Subheader5Component} from './layout/subheader/subheader5/subheader5.component';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
	declarations: [
		QuickPanelComponent,
		// StickyToolbarComponent,
		ScrollTopComponent,
		// SplashScreenComponent,
		// topbar components
		SearchDropdownComponent,
		Subheader1Component,
		Subheader2Component,
		Subheader3Component,
		Subheader4Component,
		Subheader5Component,
		SearchResultComponent,
		NotificationComponent,
		QuickActionComponent,
		// CartComponent,
		LanguageSelectorComponent,
		UserProfileComponent,
		ErrorComponent,
		AlertComponent,
		ActionNotificationComponent,
		DeleteEntityDialogComponent,
		/* NoticeComponent,
		 FetchEntityDialogComponent,
		 UpdateStatusDialogComponent,
		 ContextMenu2Component,
		 ContextMenuComponent,
		 NotificationComponent,
		 SearchDefaultComponent,
		 UserProfile2Component, */
	],
	exports: [
		NgPipesModule,
		//
		QuickPanelComponent,
		ScrollTopComponent,
		// ScrollTopComponent,
		// SplashScreenComponent,
		// StickyToolbarComponent,
		SearchDropdownComponent,
		Subheader1Component,
		Subheader2Component,
		Subheader3Component,
		Subheader4Component,
		Subheader5Component,
		SearchResultComponent,
		NotificationComponent,
		QuickActionComponent,
		// CartComponent,
		LanguageSelectorComponent,
		UserProfileComponent,
		ErrorComponent,
		AlertComponent,
		ActionNotificationComponent,
		DeleteEntityDialogComponent,
		MatDialogModule,
		/*WidgetModule,
		 PortletModule,
		 NoticeComponent,
		 FetchEntityDialogComponent,
		 UpdateStatusDialogComponent,

		 // topbar components
		 ContextMenu2Component,
		 ContextMenuComponent,
		 SearchDefaultComponent,
		 UserProfile2Component, */
	],
	imports: [
		CommonModule,
		CoreModule,
		InlineSVGModule,
		MatDialogModule,
		MatButtonModule,
		MatIconModule,
		NgbModule,
		PerfectScrollbarModule,
		TranslateModule.forChild(),
		RouterModule,
		MatProgressBarModule,
		/* MatProgressSpinnerModule,
		// Suheader-Includes
		MatDialogModule,
		MatIconModule,
		MatSnackBarModule,
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
		 MatNativeDateModule,
		 MatProgressBarModule,
		 MatDatepickerModule,
		 MatCardModule,,
		 MatCheckboxModule,
		 MatTabsModule,
		 MatTooltipModule, */
	],
	entryComponents: [
		// AlertComponent,
		ActionNotificationComponent,
		DeleteEntityDialogComponent
	]
})
export class PartialsModule {
}
