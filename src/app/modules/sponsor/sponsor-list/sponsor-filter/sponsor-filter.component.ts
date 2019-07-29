import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Category} from "../../../category/_model/category.model";

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'sponsor-filter',
	templateUrl: './sponsor-filter.component.html',
	styleUrls: ['./sponsor-filter.component.scss']
})
export class SponsorFilterComponent implements OnInit {

	@Input() categories: Category[] = [];
	@Output() setFilters: EventEmitter<Category[]> = new EventEmitter<Category[]>(false);

	public form: FormGroup;

	constructor(private fb: FormBuilder) {
	}

	ngOnInit(): void {
		this.form = this.fb.group({
			assignedCategories: []
		});

		this.form.get('assignedCategories').setValue(this.categories);

		this.form.valueChanges.pipe(
			debounceTime(500),
			distinctUntilChanged()
		).subscribe((changes: {
			assignedCategories: Category[]
		}) => {
			this.setFilters.emit(changes.assignedCategories);
		});
	}

}
