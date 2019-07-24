import { Component, OnInit } from '@angular/core';
import { LayoutConfigService } from '../../../core/_base/layout';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
	selector: 'kt-settings-layout',
	templateUrl: './settings-layout.component.html',
	styleUrls: ['./settings-layout.component.scss']
})
export class SettingsLayoutComponent implements OnInit {

	private readonly config: FormlyFieldConfig[];

	form: FormGroup;
	configModel: any = {};

	constructor(private layoutConfigService: LayoutConfigService) {
		this.config = layoutConfigService.getConfig();
	}

	ngOnInit() {
		this.form = new FormGroup({});
	}

}
