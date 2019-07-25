import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AngularFirestore } from '@angular/fire/firestore';
import * as moment from 'moment';
import { Article } from '../_model/article.model';
import { AuthService } from '../../../core/auth/_services';
import { isEmpty } from 'lodash';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { currentUser } from '../../../core/auth/_selectors/auth.selectors';

const SMALL_WIDTH_BREAKPOINT = 768;

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'article-create',
	templateUrl: './article-create.component.html',
	styleUrls: ['./article-create.component.scss']
})
export class ArticleCreateComponent implements OnInit {

	@ViewChild('settings', { static: false }) settings;

	public isSmallDevice = false;

	public article: Article;
	public articleStatus = 'new';
	public form: FormGroup;
	public showPreview = false;

	public items: any = [];
	public sidePanelOpened = false;

	public publicationOptions: any[] = [
		{
			text: 'live.text',
			description: 'live.description',
			value: 1
		},
		{
			text: 'schedule.text',
			description: 'schedule.description',
			value: 2
		}
	];

	constructor(private route: ActivatedRoute,
				public breakpointObserver: BreakpointObserver,
				private afs: AngularFirestore,
				public authService: AuthService,
				private router: Router,
				private zone: NgZone,
				private store: Store<AppState>,
				// private alertService: AlertService,
				// private articleService: ArticleService,
				// private applicationService: ApplicationService,
				private fb: FormBuilder) {
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			if (!isEmpty(params)) {
				console.log('edit article', params);
			} else {
				this.article = new Article();
			}
			/* this.article = data.article;
			 if (data.article.id) {
			 this.articleStatus = 'edit';
			 } */
		});

		this.breakpointObserver
			.observe(['(min-width: ' + SMALL_WIDTH_BREAKPOINT + 'px)'])
			.subscribe((state: BreakpointState) => {
				this.isSmallDevice = state.matches;
			});

		this.form = this.fb.group({
			title: [this.article.title, [Validators.required, Validators.minLength(8)]],
			text: [this.article.text, [Validators.required, Validators.minLength(10)]],
			publication: this.fb.group({
				by: this.article.publication && this.article.publication.by ? this.article.publication.by : this.authService.getAuthUserId(),
				at: [this.article.publication && this.article.publication.at ? new Date(this.article.publication.at.seconds * 1000) : moment()],
				status: this.article.publication ? this.article.publication.status : 0
			})
		});

		this.form.valueChanges.pipe(
			debounceTime(1000),
			distinctUntilChanged()
		).subscribe((changes: Article) => {
			console.log(changes);
			this.articleStatus = 'saving';

			switch (changes.publication.status) {
				case 0:
					changes.publication.at = null;
					changes.publication.by = null;
					break;
				case 1:
					changes.publication.at = new Date();
					break;
				case 2:
					if (changes.publication.at && this.isDateObject(changes.publication.at)) {
						changes.publication.at = new Date(changes.publication.at.unix() * 1000);
					} else {
						this.articleStatus = 'error';
						return;
					}
					break;
			}

			this.article = Object.assign({}, this.article, changes);

			if (this.form.valid) {
				this.saveArticle();
			} else {
				this.articleStatus = 'error';
			}
		});
	}

	isDateObject(d: any) {
		return !isNaN(d) && d instanceof Date;
	}

	changeArticle(changes: any) {
		this.article = Object.assign({}, this.article, changes);
		this.saveArticle();
	}

	changePublicationStatus($event: any) {
		$event.stopPropagation();

		if (this.form.get('publication.status').value === 2) {
			this.form.get('publication.at').setValue(moment());
		}
	}

	togglePreview(): void {
		this.showPreview = !this.showPreview;
	}

	resetPublication(): void {
		this.form.get('publication.status').setValue(0);
		this.form.get('publication.at').setValue(null);
	}

	removeArticle(): void {
		/* if (this.article.id) {
		 this.articleService.removeArticle(this.article).then(() => {
		 this.alertService.showSnackBar('success', 'general.articles.edit.deleted');
		 this.redirectToList();
		 });
		 } else {
		 this.redirectToList();
		 } */
	}

	redirectToList(): void {
		this.router.navigate(['/articles']).then();
	}

	uploadCompleted(articleId: string): void {
		if (!this.article.id) {
			this.article.id = articleId;
		}
	}

	saveArticle() {
		let action;
		console.log('save', this.article);
		/* if (this.article.id) {
		 action = this.articleService.updateArticle(this.article.id, this.article);
		 } else {
		 this.article.id = this.afs.createId();
		 action = this.articleService.createArticle(this.article);
		 }
		 action
		 .then(() => this.articleStatus = 'success')
		 .catch((error: any) => {
		 this.alertService.showSnackBar('error', error.message);
		 this.articleStatus = 'error';
		 }); */
	}

}
