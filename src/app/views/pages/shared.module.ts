import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertService } from '../../shared/services/alert/alert.service';
import {
	MatCardModule,
	MatIconModule, MatPaginatorIntl,
	MatPaginatorModule,
	MatProgressBarModule,
	MatSnackBarModule,
	MatSortModule,
	MatTableModule
} from '@angular/material';
import { NgPipesModule } from 'ngx-pipes';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SnackbarComponent } from '../../shared/components/snackbar/snackbar.component';
import { SharedMediaModule } from '../../shared/components/media/shared-media.module';
import { LinkModule } from '../../shared/components/links/link.module';
import { PortletModule } from '../partials/content/general/portlet/portlet.module';
import {PaginatorI18n} from "../../shared/classes/paginator-i18n.class";

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
		MatProgressBarModule,
	],
	providers: [
		AlertService,
		{
			provide: MatPaginatorIntl, deps: [TranslateService],
			useFactory: (translateService: TranslateService) => new PaginatorI18n(translateService).getPaginatorIntl()
		}
	]
})
export class SharedModule {
}
