import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment';
import { IApplication } from '../../../../../shared/interfaces/application.interface';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'settings-urlshortening',
	templateUrl: './settings-urlshortening.component.html',
	styleUrls: ['./settings-urlshortening.component.scss']
})
export class SettingsUrlshorteningComponent implements OnInit {

	@Input() application: IApplication;
	@Output() saveApplication: EventEmitter<IApplication> = new EventEmitter<IApplication>(false);

	public form: FormGroup;
	public shorteningProviders = [];

	constructor(private fb: FormBuilder) {
		this.shorteningProviders = environment.urlShorteners;
	}

	ngOnInit() {
		this.form = this.fb.group({
			urlShortening: this.application.urlShortening ? this.application.urlShortening : 0
		});

		this.form.valueChanges.pipe(
			debounceTime(500),
			distinctUntilChanged()
		).subscribe((changes: any) => {
			if (this.form.valid) {
				this.application = Object.assign({}, this.application, changes);
				this.saveApplication.emit(this.application);
			}
		});
	}

}
