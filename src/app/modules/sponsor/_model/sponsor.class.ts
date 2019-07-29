import {BaseModel} from "../../../core/_base/crud";
import {Contact} from "../../../shared/_models/contact.class";
import Timestamp = firebase.firestore.Timestamp;
import firebase from 'firebase';

export class Sponsor extends BaseModel {
	displayInFooter: boolean;
	internalInfo: string;
	description: string;
	externalLink?: string;
	startDate?: Date;
	endDate?: Date;
	assignedCategories: {
		id: string;
		title: string;
	}[];
	contact: Contact;
	revenue: number;

	constructor(data: Sponsor) {
		super();
		this.displayInFooter = data.displayInFooter;
		this.startDate = data.startDate;
		this.endDate = data.endDate;
		this.internalInfo = data.internalInfo;
		this.externalLink = data.externalLink;
		this.description = data.description;
		this.assignedCategories = data.assignedCategories;
		this.contact = data.contact;
		this.revenue = data.revenue;
	}
}
