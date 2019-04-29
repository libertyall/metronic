import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IApplication } from '../../../../../shared/interfaces/application.interface';
import { BackendLayoutConfigModel, LayoutConfigService } from '../../../../../core/_base/layout';

@Component({
	selector: 'kt-settings-layout',
	templateUrl: './settings-layout.component.html',
	styleUrls: ['./settings-layout.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsLayoutComponent implements OnInit {

	@Input() application: IApplication;
	@Input() pageType: string;
	@Output() saveApplication: EventEmitter<IApplication> = new EventEmitter<IApplication>(false);

	wizardStep = 0;
	configuration: BackendLayoutConfigModel;

	constructor(private layoutConfigService: LayoutConfigService) {
	}

	ngOnInit() {
		this.configuration = this.layoutConfigService.getConfig(); // this.application.configuration ||
	}

	resetDefaults(): void {
		console.log(this.pageType);
	}

	setWizardStep(i: number) {
		this.wizardStep = i;
	}

}
