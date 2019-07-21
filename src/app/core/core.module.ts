import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentAnimateDirective, HeaderDirective, MenuDirective, StickyDirective } from './_base/layout';
import { OffcanvasDirective } from './_base/layout/directives/offcanvas.directive';
import { ScrollTopDirective } from './_base/layout/directives/scroll-top.directive';
import { ToggleDirective } from './_base/layout/directives/toggle.directive';
import { FirstLetterPipe } from './_base/layout/pipes/first-letter.pipe';
import { TabClickEventDirective } from './_base/layout/directives/tab-click-event.directive';
import { SparklineChartDirective } from './_base/layout/directives/sparkline-chart.directive';
import { TimeElapsedPipe } from './_base/layout/pipes/time-elapsed.pipe';
import { JoinPipe } from './_base/layout/pipes/join.pipe';
import { GetObjectPipe } from './_base/layout/pipes/get-object.pipe';
import { SafePipe } from './_base/layout/pipes/safe.pipe';

@NgModule({
	imports: [CommonModule],
	declarations: [
		OffcanvasDirective,
		ScrollTopDirective,
		ToggleDirective,
		MenuDirective,
		HeaderDirective,
		ContentAnimateDirective,
		TabClickEventDirective,
		SparklineChartDirective,
		StickyDirective,
		FirstLetterPipe,
		TimeElapsedPipe,
		JoinPipe,
		GetObjectPipe,
		SafePipe,
	],
	exports: [
		OffcanvasDirective,
		ScrollTopDirective,
		ToggleDirective,
		MenuDirective,
		ContentAnimateDirective,
		FirstLetterPipe,
		HeaderDirective,
		TabClickEventDirective,
		SparklineChartDirective,
		StickyDirective,
		TimeElapsedPipe,
		JoinPipe,
		GetObjectPipe,
		SafePipe,
	],
	providers: []
})
export class CoreModule {
}
