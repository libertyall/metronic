import { NgModule } from '@angular/core';
import { articleRoutes } from './article-routing.module';
import { RouterModule } from '@angular/router';
import { ArticleDashboardComponent } from './article-dashboard/article-dashboard.component';
import { TranslateModule } from '@ngx-translate/core';
import { ArticleListComponent } from './article-list/article-list.component';
import { PortletModule } from '../../views/partials/content/general/portlet/portlet.module';
import {
	MatButtonModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule,
	MatMenuModule, MatPaginatorModule, MatProgressSpinnerModule, MatRadioModule, MatSortModule, MatTableModule,
	MatTooltipModule
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { LayoutUtilsService } from '../../core/_base/crud';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { OWL_DATE_TIME_LOCALE, OwlDateTimeIntl, OwlDateTimeModule } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime/date-time/adapter/moment-adapter/moment-date-time.module';
import { NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { DeIntl } from '../../shared/intl/owl-datetime.i18n';

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatCheckboxModule,
		MatDialogModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatMenuModule,
		MatPaginatorModule,
		MatProgressSpinnerModule,
		MatRadioModule,
		MatSortModule,
		MatTableModule,
		MatTooltipModule,
		NgbTabsetModule,
		NgbTooltipModule,
		OwlDateTimeModule,
		OwlMomentDateTimeModule,
		PortletModule,
		ReactiveFormsModule,
		/* ChartsModule,
		 MatExpansionModule,
		 MatListModule,
		 MatSelectModule,
		 MatSidenavModule,
		 MatSnackBarModule,
		 MatTabsModule,
		 MatToolbarModule,
		 SharedMatchModule,
		 PerfectScrollbarModule,
		 PipesModule, */
		RouterModule.forChild(articleRoutes),
		/* ScrollingModule,
		 SharedModule,
		 SharedArticleModule,
		 SharedUserModule,
		 TagInputModule,
		 InfiniteScrollModule,
		 TimeagoModule */
		TranslateModule.forChild(),
		NgbTabsetModule
	],
	declarations: [
		ArticleDashboardComponent,
		ArticleListComponent,
		ArticleDetailComponent,
		ArticleCreateComponent,
		/* ArticleEditComponent,
		 ArticleEditSidebarComponent,
		 ArticleMatchesComponent,
		 ArticlesComponent,
		 ScrollableDirective,
		 SidebarMetaDataComponent,
		 SidebarMainDataComponent,
		 SidebarLinksDataComponent,
		 ArticleAuthorsStatsComponent,
		 ArticleDashboardListComponent */
	],
	providers: [
		LayoutUtilsService,
		/* ApplicationService,
		 ArticleResolver,
		 ArticleService,
		 CategoryService,
		 CategoryTypeService,
		 LocationService,
		 MatchService,
		 MemberService,
		 PaginationService,
		 SeasonService,
		 TeamService,
		 UserService,*/
		 { provide: OWL_DATE_TIME_LOCALE, useValue: 'de' },
		 { provide: OwlDateTimeIntl, useClass: DeIntl }
	]
})

export class ArticleModule {
}
