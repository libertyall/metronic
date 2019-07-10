import { MatPaginatorIntl } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Injectable()
export class MatPaginatorI18nService extends MatPaginatorIntl {

	public constructor(private translate: TranslateService) {
		super();

		this.translate.onLangChange.subscribe(() => {
			this.getAndInitTranslations();
		});

		this.getAndInitTranslations();
	}

	public getRangeLabel = (page: number, pageSize: number, length: number): string => {
		if (length === 0 || pageSize === 0) {
			return `0 / ${ length }`;
		}

		length = Math.max(length, 0);

		const startIndex: number = page * pageSize;
		const endIndex: number = startIndex < length
			? Math.min(startIndex + pageSize, length)
			: startIndex + pageSize;

		return `${ startIndex + 1 } - ${ endIndex } / ${ length }`;
	};

	public getAndInitTranslations(): void {
		this.translate.get([
			'ITEMS_PER_PAGE_LABEL',
			'FIRST_PAGE_LABEL',
			'LAST_PAGE_LABEL',
			'NEXT_PAGE_LABEL',
			'PREVIOUS_PAGE_LABEL'
		]).subscribe((translation: any) => {
			this.itemsPerPageLabel = translation['ITEMS_PER_PAGE_LABEL'];
			this.nextPageLabel = translation['NEXT_PAGE_LABEL'];
			this.previousPageLabel = translation['PREVIOUS_PAGE_LABEL'];
			this.firstPageLabel = translation['FIRST_PAGE_LABEL'];
			this.lastPageLabel = translation['LAST_PAGE_LABEL'];

			this.changes.next();
		});
	}
}
