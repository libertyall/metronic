// Anglar
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Layout Directives
import { ContentAnimateDirective, HeaderDirective, MenuDirective, StickyDirective } from './_base/layout';
// Metronic Pipes
// Metornic Services
import { FirstLetterPipe, GetObjectPipe, JoinPipe, OffcanvasDirective, SafePipe, ScrollTopDirective, SparklineChartDirective, TabClickEventDirective, TimeElapsedPipe, ToggleDirective } from './_base/metronic';

@NgModule({
	imports: [CommonModule],
	declarations: [
		// directives
		ScrollTopDirective,
		OffcanvasDirective,
		ToggleDirective,
		MenuDirective,
		ContentAnimateDirective,
		// pipes
		FirstLetterPipe,
		/* HeaderDirective,
		TabClickEventDirective,
		SparklineChartDirective,
		StickyDirective,
		// pipes
		TimeElapsedPipe,
		JoinPipe,
		GetObjectPipe,
		SafePipe, */
	],
	exports: [
		// directives
		ScrollTopDirective,
		OffcanvasDirective,
		ToggleDirective,
		MenuDirective,
		ContentAnimateDirective,
		// pipes
		FirstLetterPipe,
		/* HeaderDirective,
		TabClickEventDirective,
		SparklineChartDirective,
		StickyDirective,
		// pipes
		TimeElapsedPipe,
		JoinPipe,
		GetObjectPipe,
		SafePipe, */
	],
	providers: []
})
export class CoreModule {
}
