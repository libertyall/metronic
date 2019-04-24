import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IApplication } from '../../../../../shared/interfaces/application.interface';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'settings-downtime',
	templateUrl: './settings-downtime.component.html',
	styleUrls: ['./settings-downtime.component.scss']
})
export class SettingsDowntimeComponent implements OnInit {

	@Input() application: IApplication;
	@Output() saveApplication: EventEmitter<IApplication> = new EventEmitter<IApplication>(false);

	public form: FormGroup;

	constructor(private fb: FormBuilder) {
	}

	ngOnInit() {
		this.form = this.fb.group({
			downtime: this.fb.group({
				isEnabled: this.application.downtime ? this.application.downtime.isEnabled : false,
				message: this.application.downtime ? this.application.downtime.message : ''
			})
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
