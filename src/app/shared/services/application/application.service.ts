import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {map, take} from 'rxjs/operators';
import {IApplication} from '../../interfaces/application.interface';
import {LayoutConfigService} from '../../../core/_base/layout';
import * as _ from 'lodash';
import {LayoutConfig} from "../../../core/_config/default/layout.config";


@Injectable()
export class ApplicationService {

	private path = `applications`;

	public currentApplication$: Observable<IApplication>;

	public applicationConfig: {
		id?: string;
		isCurrentApplication?: boolean,
		appConfig?: any
	} = {};

	constructor(private afs: AngularFirestore) {
	}

	getCurrentApplication(): Observable<IApplication> {
		if (!this.currentApplication$) {
			this.currentApplication$ = this.afs.collection<IApplication>(this.path, ref =>
				ref.where('isCurrentApplication', '==', true)
			).valueChanges().pipe(
				map((applications: IApplication[]) => {
					return applications.find((app: IApplication) => {
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
				map((app: IApplication) => {
						const defaultConfig = new LayoutConfig().configs;
						layoutConfigService.loadConfigs(defaultConfig);
						this.applicationConfig = {...this.applicationConfig, ...defaultConfig, ...app};
						return this.applicationConfig;
					}
				));
		} else {
			return of(this.applicationConfig);
		}

	}

	createApplication(application: IApplication): Promise<IApplication> {
		application.id = this.afs.createId();
		return this.afs.collection(this.path).doc(application.id).set(application).then(
			() => {
				return application;
			}
		);
	}

	updateApplication(application: IApplication): Promise<any> {
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
