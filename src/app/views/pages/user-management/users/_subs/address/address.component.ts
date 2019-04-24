import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Address } from '../../../../../../core/auth/_interfaces/address.interface';

@Component({
	selector: 'kt-address',
	templateUrl: './address.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressComponent implements OnInit {

	@Input() addressSubject: BehaviorSubject<Address>;
	hasFormErrors: boolean = false;
	addressForm: FormGroup;

	constructor(private fb: FormBuilder) {
	}

	ngOnInit() {
		if (!this.addressSubject.value) {
			const newAddress: Address = {
				addressLine: '',
				state: '',
				postCode: '',
				city: ''
			};
			this.addressSubject.next(newAddress);
		}

		this.createForm();
		this.addressForm.valueChanges
			.pipe(
				debounceTime(150),
				distinctUntilChanged(),
				tap(() => {
					this.updateAddress();
				})
			)
			.subscribe();
	}

	createForm() {
		this.addressForm = this.fb.group({
			addressLine: [ this.addressSubject.value.addressLine, Validators.required ],
			city: [ this.addressSubject.value.city, Validators.required ],
			state: [ this.addressSubject.value.state, Validators.required ],
			postCode: [ this.addressSubject.value.postCode, Validators.required ]
		});
	}

	updateAddress() {
		this.hasFormErrors = false;
		const controls = this.addressForm.controls;
		if (this.addressForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[ controlName ].markAsTouched()
			);
			this.hasFormErrors = true;

			return;
		}

		const newAddress: Address = {
			addressLine: controls[ 'addressLine' ].value,
			state: controls[ 'state' ].value,
			postCode: controls[ 'postCode' ].value,
			city: controls[ 'city' ].value
		};
		this.addressSubject.next(newAddress);
	}

	onAlertClose() {
		this.hasFormErrors = false;
	}
}
