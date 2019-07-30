export class ClubManagement {
	assignedMember?: {
		id: string;
		firstName: string;
		lastName: string;
	};
	assignedPosition?: {
		id: string;
		title: string;
	};
	startDate: {
		seconds: number;
		nanoseconds: number;
	};
	endDate?: {
		seconds: number;
		nanoseconds: number;
	};

	constructor(startDate: any) {
		this.startDate = startDate;
	}
}
