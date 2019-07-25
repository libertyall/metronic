import {EntityMetadataMap, PropsFilterFnFactory} from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
	Category: {
		filterFn: titleFilter,
		sortComparer: sortByTitle
	},
	Club: {}
};

const pluralNames = { Category: 'Categories' };

export const entityConfig = {
	entityMetadata,
	pluralNames
};

// FILTERS AND SORTERS

// Can't embed these functions directly in the entityMetadata literal because
// AOT requires us to encapsulate the logic in wrapper functions

/** Filter for entities whose name matches the case-insensitive pattern */
export function titleFilter<T extends { title: string }>(entities: T[], pattern: string) {
	return PropsFilterFnFactory(['title'])(entities, pattern);
}

/** Sort Comparer to sort the entity collection by its name property */
export function sortByTitle(a: { title: string }, b: { title: string }): number {
	return a.title.localeCompare(b.title);
}

/** Filter for entities whose name or saying matches the case-insensitive pattern *
export function nameAndSayingFilter<T extends { name: string; saying: string }>(
	entities: T[],
	pattern: string
) {
	return PropsFilterFnFactory(['name', 'saying'])(entities, pattern);
} */
