import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertService } from '../../shared/services/alert/alert.service';
import {
	MatCardModule, MatIconModule, MatMenuModule, MatPaginatorIntl, MatPaginatorModule, MatProgressBarModule,
	MatSnackBarModule,
	MatSortModule, MatTableModule
} from '@angular/material';
import { NgPipesModule } from 'ngx-pipes';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SnackbarComponent } from '../../shared/components/snackbar/snackbar.component';
import { SharedMediaModule } from '../../shared/components/media/shared-media.module';
import { LinkModule } from '../../shared/components/links/link.module';
import { PortletModule } from '../partials/content/general/portlet/portlet.module';
import { MatPaginatorI18nService } from '../../shared/services/application/mat-paginator-i18n.service';

@NgModule({
	declarations: [
		SnackbarComponent
	],
	exports: [
		CommonModule,
		LinkModule,
		MatCardModule,
		MatSnackBarModule,
		MatIconModule,
		MatMenuModule,
		MatPaginatorModule,
		MatSortModule,
		MatTableModule,
		NgPipesModule,
		NgxDatatableModule,
		PortletModule,
		ReactiveFormsModule,
		SharedMediaModule,
		TranslateModule
	],
	imports: [
		CommonModule,
		MatIconModule,
		MatProgressBarModule
	],
	providers: [
		AlertService,
		{
			provide: MatPaginatorIntl, deps: [TranslateService],
			useClass: MatPaginatorI18nService
		}
	],
	entryComponents: [
		SnackbarComponent
	]
})
export class SharedModule {
}
