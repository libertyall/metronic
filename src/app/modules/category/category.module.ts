import { NgModule } from '@angular/core';
import { categoryRoutes } from './category-routing.module';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import {
	MatButtonModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule,
	MatMenuModule, MatOptionModule, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule, MatSortModule,
	MatTableModule, MatTabsModule, MatTooltipModule
} from '@angular/material';
import { PortletModule } from '../../views/partials/content/general/portlet/portlet.module';
import { LayoutUtilsService } from '../../core/_base/crud';
import { ReactiveFormsModule } from '@angular/forms';
import { PartialsModule } from '../../views/partials/partials.module';
import { CategoryService } from './_services/category.service';
import { EntityServices } from '@ngrx/data';
import { AppSelectors } from '../settings/_selectors/app.selectors';
import { EffectsModule } from '@ngrx/effects';
import { CategoryEffects } from './_effects/category.effects';

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
		MatOptionModule,
		MatPaginatorModule,
		MatProgressSpinnerModule,
		MatSelectModule,
		MatSortModule,
		MatTableModule,
		MatTabsModule,
		MatTooltipModule,
		PartialsModule,
		PortletModule,
		ReactiveFormsModule,
		RouterModule.forChild(categoryRoutes),
		TranslateModule.forChild(),
		EffectsModule.forFeature([CategoryEffects ])
	],
	declarations: [
		CategoriesComponent,
		CategoryListComponent,
		CategoryFormComponent
	],
	providers: [
		AppSelectors,
		CategoryService,
		LayoutUtilsService
	]
})

export class CategoryModule {
	constructor(entityServices: EntityServices, categoryService: CategoryService) {
		entityServices.registerEntityCollectionService(categoryService);
	}
}
