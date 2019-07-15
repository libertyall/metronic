import {EntityDataModuleConfig, EntityMetadataMap} from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
	Application: {},
	Category: {},
	/* article: {},
    club: {},
    file: {},
    gallery: {},
    location: {},
    match: {},
    memberOfTheWeek: {},
    member: {},
    report: {},
    season: {},
    sponsor: {},
    teamOfTheMonth: {},
    team: {},
    // user: {} */
};

const pluralNames = {
	category: 'categories',
	gallery: 'galleries',
	match: 'matches'
};

export const entityConfig: EntityDataModuleConfig = {
	entityMetadata,
	pluralNames
};
