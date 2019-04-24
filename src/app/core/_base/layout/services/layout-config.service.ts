import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as objectPath from 'object-path';
import { merge } from 'lodash';
import { LayoutConfigModel } from '..';

@Injectable()
export class LayoutConfigService {

	onConfigUpdated$: Subject<LayoutConfigModel>;
	layoutConfig: LayoutConfigModel;

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
	saveConfig(layoutConfig: LayoutConfigModel): void {
		if (layoutConfig) {
			localStorage.setItem('layoutConfig', JSON.stringify(layoutConfig));
		}
	}

	/**
	 * Get layout config from local storage
	 */
	getSavedConfig(): LayoutConfigModel {
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
	 * @param path | object path separated by dot
	 */
	getConfig(path?: string): LayoutConfigModel | any {
		this.layoutConfig = this.getSavedConfig();
		if (path) {
			return objectPath.get(this.layoutConfig, path);
		}
		return this.layoutConfig;
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
		const menuAsideLeftSkin = objectPath.get(this.layoutConfig, 'brand.self.skin');
		const logoObject = objectPath.get(this.layoutConfig, 'self.logo');

		let logo;
		if (typeof logoObject === 'string') {
			logo = logoObject;
		}
		if (typeof logoObject === 'object') {
			logo = objectPath.get(logoObject, menuAsideLeftSkin + '');
		}
		if (typeof logo === 'undefined') {
			try {
				const logos = objectPath.get(this.layoutConfig, 'self.logo');
				logo = logos[Object.keys(logos)[0]];
			}
			catch (e) {
				console.log(e);
			}
		}
		return logo;
	}

	/**
	 * Returns sticky logo
	 */
	getStickyLogo(): string {
		let logo = objectPath.get(this.layoutConfig, 'self.logo.sticky');
		if (typeof logo === 'undefined') {
			logo = this.getLogo();
		}
		return logo + '';
	}

	/**
	 * Initialize layout config
	 * @param config
	 */
	loadConfigs(config: LayoutConfigModel) {
		this.layoutConfig = this.getSavedConfig();
		if (!this.layoutConfig || objectPath.get(this.layoutConfig, 'demo') !== config.demo) {
			this.layoutConfig = config;
		}
		this.saveConfig(this.layoutConfig);
	}

	/**
	 * Reload current layout config to the state of latest saved config
	 */
	reloadConfigs(): LayoutConfigModel {
		this.layoutConfig = this.getSavedConfig();
		this.onConfigUpdated$.next(this.layoutConfig);
		return this.layoutConfig;
	}

	/**
	 * Get default route name by object
	 */
	getCurrentMainRoute(): string {
		const config = this.getConfig();
		if (!config) {
			return '';
		}

		const url = config.demo;
		if (!url) {
			return '';
		}

		return url;
	}
}
