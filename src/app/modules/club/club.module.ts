import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClubsComponent} from './clubs/clubs.component';
import {ClubRoutingModule} from "./club-routing.module";
import {ClubFormComponent} from "./club-form/club-form.component";
import {PortletModule} from "../../views/partials/content/general/portlet/portlet.module";
import {TranslateModule} from "@ngx-translate/core";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {
	DateAdapter,
	MatCheckboxModule,
	MatDatepickerModule,
	MatFormFieldModule,
	MatInputModule, MatNativeDateModule,
	MatSelectModule, NativeDateAdapter
} from "@angular/material";
import {ReactiveFormsModule} from "@angular/forms";
import {NgPipesModule} from "ngx-pipes";
import {ClubResolver} from "./club.resolver";
import {TabsModule} from "ng-uikit-pro-standard";
import {ClubFormHistoryComponent} from "./club-form/club-form-history/club-form-history.component";
import {ClubFormMainComponent} from "./club-form/club-form-main/club-form-main.component";
import {ClubFormHonorariesComponent} from "./club-form/club-form-honoraries/club-form-honoraries.component";
import { HonoraryFormListComponent } from './club-form/club-form-honoraries/honorary-form-list/honorary-form-list.component';
import {HonoraryFormComponent} from "./club-form/club-form-honoraries/honorary-form/honorary-form.component";
import {ClubHonoraryTableComponent} from "./club-form/club-form-honoraries/club-honorary-table/club-honorary-table.component";

@NgModule({
	declarations: [
		ClubFormComponent,
		ClubFormHistoryComponent,
		ClubFormHonorariesComponent,
		ClubFormMainComponent,
		ClubHonoraryTableComponent,
		ClubsComponent,
		HonoraryFormListComponent,
		HonoraryFormComponent
	],
	imports: [
		ClubRoutingModule,
		CommonModule,
		MatCheckboxModule,
		MatDatepickerModule,
		MatFormFieldModule,
		MatInputModule,
		MatNativeDateModule,
		MatSelectModule,
		NgbDropdownModule,
		NgPipesModule,
		PortletModule,
		ReactiveFormsModule,
		TabsModule,
		TranslateModule.forChild()
	],
	providers: [
		ClubResolver
	]
})
export class ClubModule {
}
