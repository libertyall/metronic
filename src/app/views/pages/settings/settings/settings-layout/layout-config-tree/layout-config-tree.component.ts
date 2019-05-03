import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BackendLayoutConfigModel } from '../../../../../../core/_base/layout';

@Component({
	selector: 'kt-layout-config-tree',
	templateUrl: './layout-config-tree.component.html',
	styleUrls: ['./layout-config-tree.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutConfigTreeComponent implements OnInit {

	@Input() rootData: any;
	@Input() parentNode: any[];
	@Input() pageType: string;
	@Input() configuration: BackendLayoutConfigModel;
	@Input() addedPlaceholderText = '';
	form: FormGroup;

	constructor(private fb: FormBuilder) {
	}

	ngOnInit() {
		console.log(this.rootData);
		// this.buildForm(this.node);
		// console.log(this.form);
	}

	getSubNode(node) {
		const subNodes = [];
		node.filter(o => {
			console.log(o);
			if (o.value.type) {
				subNodes.push({
					key: o.key,
					value: o.value
				});
				// console.log(o.key, o.value);
			}
			// if (o.includes('Hit')) return true;

			/* if (o.children) {
			 return (o.children = o.children.filter(f)).length;
			 } */
		});
		console.log(subNodes);
	}

	/* buildForm(config: any) {
	 if (Object.entries(config).length > 0 && config.constructor === Object) {
	 this.form = this.createFormGroup(config);

	 this.form.valueChanges.pipe(
	 debounceTime(1500),
	 distinctUntilChanged()
	 ).subscribe((changes) => {
	 console.log(this.configuration[this.pageType]);
	 console.log(this.parentNode);
	 console.log(this.configuration[this.pageType][this.parentNode]);
	 const newConfig = this.configuration[this.pageType][this.parentNode] = changes;
	 console.log(newConfig);
	 // console.log(Object.assign({}, this.parentNode, changes));
	 });
	 }
	 }

	 createFormGroup(obj: any) {
	 let formGroup: { [id: string]: AbstractControl; } = {};

	 Object.keys(obj).forEach(key => {

	 if (!obj[key].type) {
	 formGroup[key] = this.createFormGroup(obj[key]);
	 }

	 if (obj[key].type === 'multi-select' || obj[key].type === 'select' || obj[key].type === 'checkbox-list') {
	 formGroup[key] = new FormControl(obj[key].selected);
	 } else if (obj[key].type === 'list') {
	 formGroup[key] = this.generateArrayControl(obj[key].selected);
	 }
	 // formGroup[key] = Array.isArray(obj[key]) ? this.generateArrayControl(obj[key]) : obj[key] instanceof
	 // Object ? this.createFormGroup(obj[key]) : new FormControl(obj[key]);
	 });

	 return this.fb.group(formGroup);
	 }

	 generateArrayControl(values) {
	 const formArray = new FormArray([]);
	 Object.keys(values).forEach(key => {
	 if (key !== 'type') {
	 const formGroup = this.fb.group({
	 value: values[key].value,
	 title: values[key].title
	 });
	 formArray.push(formGroup);
	 }
	 });
	 return formArray;
	 }

	 /* getType(item: any) {
	 console.log(item);
	 if (Array.isArray(item)) {
	 return 'array';
	 }
	 return item === true || item === false ? 'boolean' : typeof item;
	 }

	 getPlaceHolderText(): string {
	 if (this.addedPlaceholderText) {
	 return this.addedPlaceholderText + '.';
	 }
	 return '';
	 } */

}
