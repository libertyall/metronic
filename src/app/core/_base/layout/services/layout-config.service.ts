import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import * as objectPath from 'object-path';
import {merge} from 'lodash';
import {FormlyFieldConfig} from '@ngx-formly/core';
import lodash from 'lodash-es';
import filterDeep from 'deepdash-es';

const _ = filterDeep(lodash);

@Injectable()
export class LayoutConfigService {

	onConfigUpdated$: Subject<FormlyFieldConfig[]>;
	layoutConfig: FormlyFieldConfig[];

	/**
	 * Servcie constructor
	 */
	constructor() {
		this.onConfigUpdated$ = new Subject();
	}

	/**
	 * Save layout config to the local storage
	 * @param layoutConfig
	 */
	saveConfig(layoutConfig: FormlyFieldConfig[]): void {
		if (layoutConfig) {
			localStorage.setItem('layoutConfig', JSON.stringify(layoutConfig));
		}
	}

	/**
	 * Get layout config from local storage
	 */
	getSavedConfig(): FormlyFieldConfig[] {
		const config = localStorage.getItem('layoutConfig');
		return JSON.parse(config);
	}

	/**
	 * Remove saved layout config and revert back to default
	 */
	resetConfig(): void {
		localStorage.removeItem('layoutConfig');
	}

	/**
	 * Get all config or by object path
	 * // @param path | object path separated by dot
	 */
	getConfig(/*path?: string*/): FormlyFieldConfig[] {
		return this.layoutConfig = this.getSavedConfig();
		/* if (path) {
		 return objectPath.get(this.layoutConfig, path);
		 }
		 return this.layoutConfig; */
	}

	/**
	 * Set existing config with a new value
	 * @param value
	 * @param save
	 */
	setConfig(value: any, save?: boolean): void {
		this.layoutConfig = merge(this.layoutConfig, value);
		if (save) {
			this.saveConfig(this.layoutConfig);
		}
		this.onConfigUpdated$.next(this.layoutConfig);
	}

	/**
	 * Get brand logo
	 */
	getLogo(): string {
		const menuAsideLeftSkin = this.getConfigValue('brand.self.skin');
		const logoObject = this.getConfigValue('self.mainLogo');


		let logo;
		if (typeof logoObject === 'string') {
			logo = logoObject;
		}
		if (typeof logoObject === 'object') {
			logo = objectPath.get(logoObject, menuAsideLeftSkin + '');
		}
		if (typeof logo === 'undefined') {
			try {
				const logos = this.getConfigValue('self.mainLogo');
				logo = logos[Object.keys(logos)[0]];
			} catch (e) {
				console.log(e);
			}
		}
		return logo;
	}

	/**
	 * Returns sticky logo
	 */
	getStickyLogo(): string {
		let logo = this.getConfigValue('self.stickyLogo');
		if (typeof logo === 'undefined') {
			logo = this.getLogo();
		}
		return logo + '';
	}

	/**
	 * Initialize layout config
	 * @param config
	 */
	loadConfigs(config: FormlyFieldConfig[]) {
		this.layoutConfig = this.getSavedConfig();
		if (!this.layoutConfig) {
			this.layoutConfig = config;
		}
		this.saveConfig(this.layoutConfig);
	}

	/**
	 * Reload current layout config to the state of latest saved config
	 */
	reloadConfigs(): FormlyFieldConfig[] {
		this.layoutConfig = this.getSavedConfig();
		this.onConfigUpdated$.next(this.layoutConfig);
		return this.layoutConfig;
	}

	getConfigValue(configKey: string) {
		const config = this.getConfig();
		let returnValue: any = false;
		_.filterDeep(config, (value, key, parentValue) => {
			if (value === configKey) {
				returnValue = parentValue;
			}
		});
		return returnValue.defaultValue;
	}

}
