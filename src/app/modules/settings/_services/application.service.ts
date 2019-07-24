import {Injectable} from '@angular/core';
import {from, Observable, of, throwError} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {catchError, map, take} from 'rxjs/operators';
import {LayoutConfigService} from '../../../core/_base/layout';
import * as _ from 'lodash';
import {LayoutConfig} from '../../../core/_config/default/layout.config';
import {Application} from '../_model/application.model';


@Injectable()
export class ApplicationService {

	private path = `applications`;
	public currentApplication$: Observable<Application>;
	public applicationConfig: {
		id?: string;
		isCurrentApplication?: boolean,
		appConfig?: any
	} = {};

	constructor(private afs: AngularFirestore) {
	}

	getCurrentApplication(): Observable<Application> {
		if (!this.currentApplication$) {
			this.currentApplication$ = this.afs.collection<Application>(this.path, ref =>
				ref.where('isCurrentApplication', '==', true)
			).valueChanges().pipe(
				map((applications: Application[]) => {
					return applications.find((app: Application) => {
						return app.isCurrentApplication;
					});
				})
			);
		}
		return this.currentApplication$;
	}

	getConfiguration(layoutConfigService: LayoutConfigService): Observable<{
		id?: string;
		isCurrentApplication?: boolean,
		appConfig?: any
	}> {
		if (_.isEmpty(this.applicationConfig)) {
			return this.getCurrentApplication().pipe(
				take(1),
				map((app: Application) => {
						const defaultConfig = new LayoutConfig().backendConfig;
						layoutConfigService.loadConfigs(defaultConfig);
						this.applicationConfig = {...this.applicationConfig, ...defaultConfig, ...app};
						return this.applicationConfig;
					}
				));
		} else {
			return of(this.applicationConfig);
		}
	}

	createApplication(application: Application):  Observable<Application> {
		application.id = this.afs.createId();
		return from(this.afs.collection(this.path).doc(application.id).set(application).then(() => application)).pipe(catchError(e => throwError(e)));
	}

	updateApplication(application: Application): Observable<Application> {
		return from(this.afs.collection(this.path).doc(application.id).update(application).then(() => application)).pipe(catchError(e => throwError(e)));
	}

	getWeekdays(): number[] {
		const weekdays = [];
		for (let i = 0; i < 7; i++) {
			weekdays.push(i);
		}
		return weekdays;
	}

}
