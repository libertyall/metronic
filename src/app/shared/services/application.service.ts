import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { IApplication } from '../interfaces/application.interface';
import { BackendLayoutConfigModel, LayoutConfigService } from '../../core/_base/layout';
import { LayoutConfig } from '../../core/_config/default/layout.config';

@Injectable()
export class ApplicationService {

	private collectionRef: AngularFirestoreCollection<IApplication>;
	private path = `applications`;

	public applications$: Observable<IApplication[]>;
	public currentApplication$: Observable<IApplication>;

	constructor(private afs: AngularFirestore) {
		// this.collectionRef = this.afs.collection<IApplication>(this.path);
		// this.applications$ = this.collectionRef.valueChanges();
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

	getConfiguration(appConfig: LayoutConfigService): Observable<void> {
		if (appConfig.getConfig() === null) {
			return this.getCurrentApplication().pipe(
				map((app: IApplication) => {
					if (!app.configuration) {
						const defaultConfig =  new LayoutConfig().configs;
						return appConfig.loadConfigs(defaultConfig);
					}
				})
			);
		}
		return of();
	}

	createApplication(application: IApplication): Promise<IApplication> {
		application.id = this.afs.createId();
		return this.afs.collection(this.path).doc(application.id).set(application).then(
			() => {
				return application;
			}
		);
	}

	updateApplication(applicationId: string, application: IApplication): Promise<any> {
		return this.afs.collection(this.path).doc(applicationId).update(application);
	}

	/* getAppData(): Observable<IApplication> {
	 return this.afs.collection<IApplication>(this.path, ref =>
	 ref.where('isCurrentApplication', '==', true)
	 ).valueChanges().pipe(
	 first(),
	 map((applications: IApplication[]) => {
	 return applications.find((application: IApplication) => {
	 return application.isCurrentApplication;
	 });
	 })
	 );
	 } */

	setNewApplication(): IApplication {
		return {
			id: this.afs.createId(),
			isCurrentApplication: true,
			page: {
				isEnabled: true,
				name: '',
				email: '',
				title: ''
			},
			urlShortening: 0,
			registration: '0',
			downtime: {
				isEnabled: false,
				message: ''
			},
			staticPages: [],
			social: []
		};
	}

	getWeekdays(): number[] {
		const weekdays = [];
		for (let i = 0; i < 7; i++) {
			weekdays.push(i);
		}
		return weekdays;
	}

}
