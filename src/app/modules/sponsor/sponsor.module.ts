import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SponsorListComponent} from "./sponsor-list/sponsor-list.component";
import {SponsorItemComponent} from "./sponsor-list/sponsor-item/sponsor-item.component";
import {SponsorFilterComponent} from "./sponsor-list/sponsor-filter/sponsor-filter.component";
import {RouterModule} from "@angular/router";
import {sponsorRoutes} from "./sponsor-routing.module";
import {TranslateModule} from "@ngx-translate/core";
import {
	MatCheckboxModule,
	MatDatepickerModule,
	MatFormFieldModule,
	MatInputModule, MatNativeDateModule,
	MatOptionModule,
	MatSelectModule
} from "@angular/material";
import {ReactiveFormsModule} from "@angular/forms";
import {NgPipesModule} from "ngx-pipes";
import {PortletModule} from "../../views/partials/content/general/portlet/portlet.module";
import {CategoryFilterPipe} from "../category/pipes/category-filter.pipe";
import {NgbDropdownModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {SponsorDetailComponent} from "./sponsor-detail/sponsor-detail.component";
import {SponsorResolver} from "./sponsor.resolver";
import {SharedPipesModule} from "../../shared/_pipes/shared-pipes.module";
import {PartialsModule} from "../../views/partials/partials.module";
import {EventEmitterService} from "../../shared/services/event-emitter.service";
import {SponsorsComponent} from "./sponsors/sponsors.component";
import {SponsorFormComponent} from "./sponsor-form/sponsor-form.component";
import {CategoriesResolver} from "../category/categories.resolver";

@NgModule({
	declarations: [
		CategoryFilterPipe,
		SponsorsComponent,
		SponsorDetailComponent,
		SponsorFilterComponent,
		SponsorFormComponent,
		SponsorItemComponent,
		SponsorListComponent
	],
	imports: [
		CommonModule,
		MatCheckboxModule,
		MatDatepickerModule,
		MatFormFieldModule,
		MatInputModule,
		MatNativeDateModule,
		MatOptionModule,
		MatSelectModule,
		NgbDropdownModule,
		NgbTooltipModule,
		NgPipesModule,
		PartialsModule,
		PortletModule,
		ReactiveFormsModule,
		RouterModule.forChild(sponsorRoutes),
		SharedPipesModule,
		TranslateModule.forChild()
	],
	providers: [
		CategoriesResolver,
		EventEmitterService,
		SponsorResolver
	]
})
export class SponsorModule {
}
