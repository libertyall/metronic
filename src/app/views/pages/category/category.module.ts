import { NgModule } from '@angular/core';
import { categoryRoutes } from './category-routing.module';
import { CategoryResolver } from './category.resolver';
import { RouterModule } from '@angular/router';
import { CategoriesByCategoryTypeComponent } from './categories-by-category-type/categories-by-category-type.component';
import { ChartsModule } from 'ng2-charts';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import {
	MAT_DIALOG_DEFAULT_OPTIONS, MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatListModule,
	MatOptionModule, MatProgressSpinnerModule, MatSelectModule, MatSortModule, MatTabsModule, MatTooltipModule
} from '@angular/material';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryStatisticsComponent } from './category-statistics/category-statistics.component';
import { CategoryService } from '../../../shared/services/category/category.service';
import { CategoryTypeService } from '../../../shared/services/category-type/category-type.service';
import { CreationModule } from '../../../shared/components/creation/creation.module';
import { UserService } from '../../../shared/services/user/user.service';
import { SharedModule } from '../shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { categoriesReducer } from './_reducers/category.reducers';
import { CategoryEffects } from './_effects/category.effects';
import { HttpUtilsService, InterceptService, TypesUtilsService } from '../../../core/_base/crud';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CategoryListComponent } from './category-list/category-list.component';

@NgModule({
	imports: [
		ChartsModule,
		CreationModule,
		EffectsModule.forFeature([CategoryEffects]),
		MatButtonModule,
		MatCheckboxModule,
		MatFormFieldModule,
		MatInputModule,
		MatListModule,
		MatOptionModule,
		MatSelectModule,
		MatSortModule,
		MatProgressSpinnerModule,
		MatTabsModule,
		MatTooltipModule,
		RouterModule.forChild(categoryRoutes),
		SharedModule,
		StoreModule.forFeature('categories', categoriesReducer)
	],
	declarations: [
		CategoryDetailComponent,
		CategoryEditComponent,
		CategoriesByCategoryTypeComponent,
		CategoryListComponent,
		CategoryStatisticsComponent
	],
	providers: [
		CategoryResolver,
		CategoryService,
		CategoryTypeService,
		UserService,
		InterceptService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: InterceptService,
			multi: true
		},
		{
			provide: MAT_DIALOG_DEFAULT_OPTIONS,
			useValue: {
				hasBackdrop: true,
				panelClass: 'kt-mat-dialog-container__wrapper',
				height: 'auto',
				width: '900px'
			}
		},
		HttpUtilsService,
		TypesUtilsService
	]
})

export class CategoryModule {
}
