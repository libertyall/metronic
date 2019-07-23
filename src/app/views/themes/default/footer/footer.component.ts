import {Component, OnInit} from '@angular/core';
import {LayoutConfigService} from "../../../../core/_base/layout";

@Component({
	selector: 'kt-footer',
	templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

	today: number = Date.now();
	public fluid: boolean;

	constructor(private layoutConfigService: LayoutConfigService) {
	}

	ngOnInit(): void {
		this.fluid = this.layoutConfigService.getConfigValue('footer.self.width') === 'fluid';
	}
}
