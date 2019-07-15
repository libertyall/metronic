import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAutoEntityService, IEntityInfo } from '@briebug/ngrx-auto-entity';
import { environment } from '../../../environments/environment';

@Injectable()
export class EntityService implements IAutoEntityService<any> {
	constructor(private http: HttpClient) {
	}

	load(entityInfo: IEntityInfo, id: any): Observable<any> {
		return this.http.get<any>(
			`${environment.production}/${entityInfo.modelName}/${id}`
		);
	}

	loadAll(entityInfo: IEntityInfo): Observable<any[]> {
		return this.http.get<any[]>(
			`${environment.production}/${entityInfo.modelName}`
		);
	}

	create(entityInfo: IEntityInfo, entity: any): Observable<any> {
		return this.http.post<any>(
			`${environment.production}/${entityInfo.modelName}`,
			entity
		);
	}

	update(entityInfo: IEntityInfo, entity: any): Observable<any> {
		return this.http.patch<any>(
			`${environment.production}/${entityInfo.modelName}/${entity.id}`,
			entity
		);
	}

	delete(entityInfo: IEntityInfo, entity: any): Observable<any> {
		return this.http.delete<any>(
			`${environment.production}/${entityInfo.modelName}/${entity.id}`
		).pipe(map(() => entity));
	}
}
