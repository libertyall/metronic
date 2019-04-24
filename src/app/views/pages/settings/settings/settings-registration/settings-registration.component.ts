import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IApplication } from '../../../../../shared/interfaces/application.interface';
import { AuthService } from '../../../../../core/auth/_services/auth.service';
import { Observable } from 'rxjs';
import { Role } from '../../../../../core/auth/_interfaces/role.interface';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'settings-registration',
	templateUrl: './settings-registration.component.html',
	styleUrls: ['./settings-registration.component.scss']
})
export class SettingsRegistrationComponent implements OnInit {

	@Input() application: IApplication;
	@Output() saveApplication: EventEmitter<IApplication> = new EventEmitter<IApplication>(false);

	public form: FormGroup;
	public roles: Observable<Role[]>;

	constructor(private fb: FormBuilder,
				private authService: AuthService) {
		this.roles = authService.getRoles();
	}

	ngOnInit() {
		this.form = this.fb.group({
			registration: this.application.registration ? this.application.registration : []
		});

		this.form.valueChanges.pipe(
			debounceTime(1500),
			distinctUntilChanged()
		).subscribe((changes: any) => {
			if (this.form.valid) {
				this.application = Object.assign({}, this.application, changes);
				this.saveApplication.emit(this.application);
			}
		});
	}

}
