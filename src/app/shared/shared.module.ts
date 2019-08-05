import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreationFormComponent } from './components/creation/creation-form/creation-form.component';
import { PublicationFormComponent } from './components/publication/publication-form/publication-form.component';
import { MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { PortletModule } from '../views/partials/content/general/portlet/portlet.module';

@NgModule({
	imports: [
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		ReactiveFormsModule,
		TranslateModule,
		PortletModule
	],
	exports: [
		CreationFormComponent, PublicationFormComponent
	],
	declarations: [CreationFormComponent, PublicationFormComponent]
})
export class SharedModule {
}
