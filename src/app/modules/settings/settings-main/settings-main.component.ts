import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {Application} from "../_model/application.model";
import {RoleClass} from "../../../core/auth/_interfaces/role.interface";
import {AppState} from "../../../store/app.state";

@Component({
	selector: 'kt-settings-main',
	templateUrl: './settings-main.component.html',
	styleUrls: ['./settings-main.component.scss']
})
export class SettingsMainComponent implements OnInit {

	@Input() application: Application;
	@Output() saveApplication: EventEmitter<Application> = new EventEmitter<Application>(false);
	@Output() setFormErrors: EventEmitter<boolean> = new EventEmitter<boolean>(false);

	form: FormGroup;

	titleParams = {
		minLength: 3,
		maxLength: 50
	};
	subTitleParams = {
		minLength: 3,
		maxLength: 100
	};

	roles$: Observable<RoleClass[]>;

	constructor(private activatedRoute: ActivatedRoute,
				private store: Store<AppState>,
				private router: Router,
				private fb: FormBuilder) {
		// ToDo: Load all roles
		// this.store.dispatch(new AllRolesRequested());
		// this.roles$ = this.store.pipe(select(selectAllRoles));
	}

	ngOnInit(): void {
		this.initForm();
	}

	initForm(): void {
		this.form = this.fb.group({
			downtime: this.fb.group({
				isEnabled: this.application.downtime.isEnabled,
				message: this.application.downtime.message
			}),
			page: this.fb.group({
				title: [this.application.page.title, [Validators.required, Validators.minLength(this.titleParams.minLength), Validators.maxLength(this.titleParams.maxLength)]],
				subTitle: [this.application.page.subTitle, [Validators.required, Validators.minLength(this.subTitleParams.minLength), Validators.maxLength(this.subTitleParams.maxLength)]],
				email: [this.application.page.email, [Validators.email, Validators.required]],
				description: this.application.page.description,
				assignedKeywords: this.application.page.assignedKeywords
			}),
			registration: this.fb.group({
				isEnabled: true,
				defaultRole: ''
			})
		});

		this.form.valueChanges.pipe(
			debounceTime(500),
			distinctUntilChanged()
		).subscribe((changes: any) => {

			this.setFormErrors.emit(false);
			const controls = this.form.controls;

			if (this.form.invalid) {
				console.log('invalid');
				Object.keys(controls).forEach(controlName =>
					controls[controlName].markAsTouched()
				);

				this.setFormErrors.emit(true);
				return;
			}

			this.application = Object.assign({}, this.application, changes);
			this.saveApplication.emit(this.application);
		});
	}

}
