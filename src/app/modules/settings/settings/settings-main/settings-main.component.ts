import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SubheaderService} from '../../../../core/_base/layout';
import {ExternalLinkModel} from "../../_model/external-link.model";
import {RoleActions} from "../../../../core/auth/_actions/role.actions";

@Component({
	selector: 'kt-settings-main',
	templateUrl: './settings-main.component.html',
	styleUrls: ['./settings-main.component.scss']
})
export class SettingsMainComponent implements OnInit {

	form: FormGroup;
	titleParams = {
		minLength: 3,
		maxLength: 50
	};
	subTitleParams = {
		minLength: 3,
		maxLength: 100
	};

	roles = [];

	constructor(private activatedRoute: ActivatedRoute,
				// private applicationService: ApplicationService,
				private router: Router,
				private fb: FormBuilder,
				// private layoutUtilsService: LayoutUtilsService,
				// private store: Store<AppState>,
				// private layoutConfigService: LayoutConfigService
				) {
	}

	ngOnInit(): void {
		this.initForm();
	}

	initForm(): void {
		this.form = this.fb.group({
			downtime: this.fb.group({
				isEnabled: false,
				message: ''
			}),
			links: this.initLinks(),
			page: this.fb.group({
				title: ['', [Validators.minLength(this.titleParams.minLength), Validators.maxLength(this.titleParams.maxLength)]],
				subTitle: ['', [Validators.minLength(this.subTitleParams.minLength), Validators.maxLength(this.subTitleParams.maxLength)]],
				email: ['', [Validators.email, Validators.required]],
				isEnabled: true,
				description: '',
				assignedKeywords: ''
			}),
			registration: this.fb.group({
				isEnabled: true,
				defaultRole: ''
			})
		});
	}

	initLinks(): FormArray {
		const formArray: FormArray = this.fb.array([]);
		/* if (this.application.socialNetworks && this.application.socialNetworks.length > 0) {
			this.application.socialNetworks.forEach((socialNetwork: ISocialNetwork) => {
				formArray.push(this.initSocialNetwork(socialNetwork));
			});
		} */
		console.log('ToDo');
		return formArray;
	}

	initLink(externalLink?: ExternalLinkModel): FormGroup {
		return this.fb.group({
			title: [externalLink ? externalLink.title : '', [Validators.required, Validators.minLength(3)]],
			isEnabled: [externalLink ? externalLink.isEnabled : true],
			target: [externalLink ? externalLink.target : 'blank'],
			link: [externalLink ? externalLink.link : '', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
		});
	}

}
