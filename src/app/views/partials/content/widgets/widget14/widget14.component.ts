import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { LayoutConfigService } from '../../../../../core/_base/layout';
import { Chart } from 'chart.js';

@Component({
	selector: 'kt-widget14',
	templateUrl: './widget14.component.html',
	styleUrls: ['./widget14.component.scss'],
})
export class Widget14Component implements OnInit {

	@Input() title: string;
	@Input() desc: string;
	@Input() data: { labels: string[]; datasets: any[] };
	@ViewChild('chart', {static: true}) chart: ElementRef;

	constructor(private layoutConfigService: LayoutConfigService) {
	}

	ngOnInit() {
		if (!this.data) {
			this.data = {
				labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5', 'Label 6', 'Label 7', 'Label 8', 'Label 9', 'Label 10', 'Label 11', 'Label 12', 'Label 13', 'Label 14', 'Label 15', 'Label 16'],
				datasets: [
					{
						// label: 'dataset 1',
						backgroundColor: this.layoutConfigService.getConfigValue('colors.state.success'),
						data: [
							15, 20, 25, 30, 25, 20, 15, 20, 25, 30, 25, 20, 15, 10, 15, 20
						]
					}, {
						// label: 'dataset 2',
						backgroundColor: '#f3f3fb',
						data: [
							15, 20, 25, 30, 25, 20, 15, 20, 25, 30, 25, 20, 15, 10, 15, 20
						]
					}
				]
			};
		}

		this.initChartJS();
	}

	initChartJS() {
		const config: Chart.ChartConfiguration = {
			type: 'bar',
			data: this.data,
			options: {
				title: {
					display: false,
				},
				tooltips: {
					intersect: false,
					mode: 'nearest',
					xPadding: 10,
					yPadding: 10,
					caretPadding: 10
				},
				legend: {
					display: false
				},
				responsive: true,
				maintainAspectRatio: false,
				// barRadius: 4,
				// gridLines: false,
				scales: {
					xAxes: [
						{
							display: false,
							stacked: true
						}
					],
					yAxes: [
						{
							display: false,
							stacked: true,
						}
					]
				},
				layout: {
					padding: {
						left: 0,
						right: 0,
						top: 0,
						bottom: 0
					}
				}
			}
		};

		const chart = new Chart(this.chart.nativeElement, config);
	}
}
