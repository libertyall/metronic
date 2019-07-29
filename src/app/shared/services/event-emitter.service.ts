import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class EventEmitterService {

	dataStr: EventEmitter<any> = new EventEmitter<any>(false);

	constructor() { }

	emitValue(data: any) {
		this.dataStr.emit(data);
	}
}
