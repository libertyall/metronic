import { Component } from '@angular/core';
import { OffcanvasOptions } from '../../../../core/_base/layout/directives/offcanvas.directive';

@Component({
	selector: 'kt-quick-panel',
	templateUrl: './quick-panel.component.html',
	styleUrls: ['./quick-panel.component.scss']
})
export class QuickPanelComponent {
	// Public properties
	offcanvasOptions: OffcanvasOptions = {
		overlay: true,
		baseClass: 'kt-quick-panel',
		closeBy: 'kt_quick_panel_close_btn',
		toggleBy: 'kt_quick_panel_toggler_btn'
	};
}
