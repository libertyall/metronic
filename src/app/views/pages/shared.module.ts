import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [],
	exports: [
		ReactiveFormsModule,
		TranslateModule
	],
	imports: [
		CommonModule
	],
	providers: []
})
export class SharedModule {
}
