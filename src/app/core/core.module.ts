import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentAnimateDirective, HeaderDirective, MenuDirective, StickyDirective } from './_base/layout';
import { FirstLetterPipe, GetObjectPipe, JoinPipe, OffcanvasDirective, SafePipe, ScrollTopDirective, SparklineChartDirective, TabClickEventDirective, TimeElapsedPipe, ToggleDirective } from './_base/metronic';

@NgModule({
	imports: [CommonModule],
	declarations: [
		OffcanvasDirective,
		ScrollTopDirective,
		ToggleDirective,
		// directives
		MenuDirective,
		// ContentAnimateDirective,
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
		OffcanvasDirective,
		ScrollTopDirective,
		ToggleDirective,
		// directives
		MenuDirective,
		// ContentAnimateDirective,
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
