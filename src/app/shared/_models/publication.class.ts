import { Moment } from 'moment';

export interface Publication {
	at: {
		seconds: number;
		nanoseconds: number;
	} | any;
	status: number;
	by: string;
}
