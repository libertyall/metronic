import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as objectPath from 'object-path';
import { merge } from 'lodash';
import { BackendLayoutConfigModel } from '..';

@Injectable()
export class LayoutConfigService {

	onConfigUpdated$: Subject<{
		backend: BackendLayoutConfigModel,
		frontend: any
	}>;
	layoutConfig: {
		backend: BackendLayoutConfigModel,
		frontend: any
	};

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
	saveConfig(layoutConfig: {
		backend: BackendLayoutConfigModel,
		frontend: any
	}): void {
		if (layoutConfig) {
			localStorage.setItem('layoutConfig', JSON.stringify(layoutConfig));
		}
	}

	/**
	 * Get layout config from local storage
	 */
	getSavedConfig(): {
		backend: BackendLayoutConfigModel,
		frontend: any
	} {
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
	getConfig(path?: string): BackendLayoutConfigModel | any {
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
	getLogo(type: string): string {
		const menuAsideLeftSkin = objectPath.get(this.layoutConfig, type + '.brand.self.skin.selected');
		const logoObject = objectPath.get(this.layoutConfig, type + '.self.mainLogo.selected');

		let logo;
		if (typeof logoObject === 'string') {
			logo = logoObject;
		}
		if (typeof logoObject === 'object') {
			logo = objectPath.get(logoObject, menuAsideLeftSkin + '');
		}
		if (typeof logo === 'undefined') {
			try {
				console.log(this.layoutConfig);
				const logos = objectPath.get(this.layoutConfig, type + '.self.mainLogo.selected');
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
	getStickyLogo(type: string): string {
		let logo = objectPath.get(this.layoutConfig, type + '.self.logo.stickyLogo.selected');
		if (typeof logo === 'undefined') {
			logo = this.getLogo(type);
		}
		return logo + '';
	}

	/**
	 * Initialize layout config
	 * @param config
	 */
	loadConfigs(config: {
		backend: BackendLayoutConfigModel,
		frontend: any
	}) {
		this.layoutConfig = this.getSavedConfig();
		if (!this.layoutConfig) {
			this.layoutConfig = config;
		}
		this.saveConfig(this.layoutConfig);
	}

	/**
	 * Reload current layout config to the state of latest saved config
	 */
	reloadConfigs(): {
		backend: BackendLayoutConfigModel,
		frontend: any
	} {
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
