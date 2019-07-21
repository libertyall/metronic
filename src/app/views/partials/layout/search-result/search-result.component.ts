import { Component, Input } from '@angular/core';

export interface ISearchResult {
	icon: string;
	text: string;
}

@Component({
	selector: 'kt-search-result',
	templateUrl: './search-result.component.html',
	styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent {
	@Input() data: ISearchResult[];
	@Input() noRecordText: string;
}
