import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {map, take} from 'rxjs/operators';
import {LayoutConfigService} from '../../../core/_base/layout';
import * as _ from 'lodash';
import {LayoutConfig} from '../../../core/_config/default/layout.config';
import {ApplicationModel} from '../model/application.model';


@Injectable()
export class ApplicationService {

	private path = `applications`;
	public currentApplication$: Observable<ApplicationModel>;
	public applicationConfig: {
		id?: string;
		isCurrentApplication?: boolean,
		appConfig?: any
	} = {};

	constructor(private afs: AngularFirestore) {
	}

	getCurrentApplication(): Observable<ApplicationModel> {
		if (!this.currentApplication$) {
			this.currentApplication$ = this.afs.collection<ApplicationModel>(this.path, ref =>
				ref.where('isCurrentApplication', '==', true)
			).valueChanges().pipe(
				map((applications: ApplicationModel[]) => {
					return applications.find((app: ApplicationModel) => {
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
				map((app: ApplicationModel) => {
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

	createApplication(application: ApplicationModel): Promise<ApplicationModel> {
		application.id = this.afs.createId();
		return this.afs.collection(this.path).doc(application.id).set(application).then(
			() => {
				return application;
			}
		);
	}

	updateApplication(application: ApplicationModel): Promise<any> {
		return this.afs.collection(this.path).doc(application.id).update(application);
	}

	getWeekdays(): number[] {
		const weekdays = [];
		for (let i = 0; i < 7; i++) {
			weekdays.push(i);
		}
		return weekdays;
	}

}
