import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import * as objectPath from 'object-path';
import { merge } from 'lodash';

@Injectable()
export class PageConfigService {

	onConfigUpdated$: Subject<any>;
	pageConfig: any;

	constructor(private router: Router) {
		this.onConfigUpdated$ = new Subject();
	}

	getCurrentPageConfig(path?: string): any {
		let url = this.router.url;

		if (new RegExp(/^\/de/).test(url)) {
			const urls = url.split('/');
			urls.splice(0, 2);
			url = urls.join('/');
		}

		let configPath = url.replace(/\//g, '.');

		if (path) {
			configPath += '.' + path;
		}

		// get page config by path
		return objectPath.get(this.pageConfig, configPath);
	}

	setConfig(value: any, save?: boolean): void {
		this.pageConfig = merge(this.pageConfig, value);

		if (save) {
			// not implemented
		}

		// fire off an event that all subscribers will listen
		this.onConfigUpdated$.next(this.pageConfig);
	}

	loadConfigs(config: any) {
		this.pageConfig = config;
		this.onConfigUpdated$.next(this.pageConfig);
	}
}
