import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../../../environments/environment';

@Component({
	selector: 'kt-search-dropdown',
	templateUrl: './search-dropdown.component.html'
})
export class SearchDropdownComponent implements OnInit {

	searchConfig = {
		...environment.algolia,
		indexName: 'categories_index'
	};

	showResults = false;

	@Input() icon: string = 'flaticon2-search-1';
	@Input() useSVG: boolean;

	// @ViewChild('searchInput', {static: true}) searchInput: ElementRef;

	// data: any[];
	// result: any[];
	// loading: boolean;

	constructor() { // private cdr: ChangeDetectorRef
	}

	ngOnInit(): void {
	}

	searchChanged(query: any) {
		this.showResults = !!query.length;
	}

	/*
	 clear(e) {
	 this.data = null;
	 this.searchInput.nativeElement.value = '';
	 }

	 openChange() {
	 setTimeout(() => this.searchInput.nativeElement.focus());
	 } */

}
