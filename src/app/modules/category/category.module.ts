import {NgModule} from '@angular/core';
import {categoryRoutes} from './category-routing.module';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {CategoriesComponent} from './categories/categories.component';
import {CategoryListComponent} from './categories/category-list/category-list.component';
import {CategoryFormComponent} from './categories/category-form/category-form.component';
import {
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
	MatTooltipModule
} from '@angular/material';
import {PortletModule} from '../../views/partials/content/general/portlet/portlet.module';
import {LayoutUtilsService} from '../../core/_base/crud';
import {ReactiveFormsModule} from '@angular/forms';
import {PartialsModule} from '../../views/partials/partials.module';
import {CategoriesResolver} from "./categories.resolver";
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';

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
		NgbDropdownModule,
		PartialsModule,
		PortletModule,
		ReactiveFormsModule,
		SharedModule,
		RouterModule.forChild(categoryRoutes),
		TranslateModule.forChild()
	],
	declarations: [
		CategoriesComponent,
		CategoryListComponent,
		CategoryFormComponent
	],
	providers: [
		CategoriesResolver,
		LayoutUtilsService
	]
})

export class CategoryModule {
}
