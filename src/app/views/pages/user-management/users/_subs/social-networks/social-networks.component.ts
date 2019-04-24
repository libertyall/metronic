// Angular
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { SocialNetworks } from '../../../../../../core/auth/_interfaces/social-networks.interface';


@Component({
	selector: 'kt-social-networks',
	templateUrl: './social-networks.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialNetworksComponent implements OnInit {

	@Input() loadingSubject = new BehaviorSubject<boolean>(false);
	@Input() socialNetworksSubject: BehaviorSubject<SocialNetworks>;
	hasFormErrors: boolean = false;
	socialNetworksForm: FormGroup;

	constructor(private fb: FormBuilder) {
	}

	ngOnInit() {
		if (!this.socialNetworksSubject.value) {
			const newSocialNetworks: SocialNetworks = {};
			this.socialNetworksSubject.next(newSocialNetworks);
		}

		this.createForm();
		this.socialNetworksForm.valueChanges
			.pipe(
				// tslint:disable-next-line:max-line-length
				debounceTime(150),
				distinctUntilChanged(),
				tap(() => {
					this.updateSocialNetworks();
				})
			)
			.subscribe();
	}

	createForm() {
		this.socialNetworksForm = this.fb.group({
			linkedIn: [ this.socialNetworksSubject.value.linkedIn ],
			facebook: [ this.socialNetworksSubject.value.facebook ],
			twitter: [ this.socialNetworksSubject.value.twitter ],
			instagram: [ this.socialNetworksSubject.value.instagram ]
		});
	}

	updateSocialNetworks() {
		this.loadingSubject.next(true);
		this.hasFormErrors = false;
		const controls = this.socialNetworksForm.controls;

		if (this.socialNetworksForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[ controlName ].markAsTouched()
			);
			this.hasFormErrors = true;
			this.loadingSubject.next(false);

			return;
		}

		const newSocialNetworks: SocialNetworks = {
			linkedIn: controls[ 'linkedIn' ].value,
			facebook: controls[ 'facebook' ].value,
			twitter: controls[ 'twitter' ].value,
			instagram: controls[ 'instagram' ].value,
		};
		this.socialNetworksSubject.next(newSocialNetworks);
		this.loadingSubject.next(false);
	}

	onAlertClose($event) {
		this.hasFormErrors = false;
	}
}
