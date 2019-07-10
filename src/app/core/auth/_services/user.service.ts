import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserInterface } from '../_interfaces/user.interface';
import { QueryParamsModel } from '../../_base/crud';
import { map, take } from 'rxjs/operators';

@Injectable()
export class UserService {

	private collectionRef: AngularFirestoreCollection<UserInterface>;
	private path = `users`;

	users$: Observable<UserInterface[]>;

	constructor(private afs: AngularFirestore) {
		this.collectionRef = this.afs.collection<UserInterface>(this.path);
		this.users$ = this.collectionRef.valueChanges();
	}

	createUser(user: UserInterface): Promise<void> {
		user.id = this.afs.createId();
		return this.afs.collection<UserInterface>(this.path).doc(user.id).set(user);
	}

	removeUser(user: UserInterface): Promise<any> {
		return this.afs.collection<UserInterface>(this.path).doc(user.id).delete();
	}

	updateUser(userId: string, user: UserInterface): Promise<any> {
		return this.afs.collection<UserInterface>(this.path).doc(userId).update(user);
	}

	getUserById(userId: string): Observable<UserInterface> {
		return this.afs.doc<UserInterface>(this.path + '/' + userId).valueChanges();
	}

	getUserList(page: QueryParamsModel): Observable<any> {
		const { filter, pageNumber, pageSize, sortField, sortOrder } = page;
		return this.users$.pipe(
			take(1),
			map(users => {
				const totalItems = users.length;
				const filteredItems = this.searchUser(filter, users);
				const sortedItems = this.sortData(filteredItems, sortField, sortOrder);
				const paginatedItems = sortedItems.splice(pageNumber * pageSize, pageSize);
				return {
					items: paginatedItems,
					totalCount: totalItems,
					errorMessage: ''
				};
			})
		);
	}

	sortData(items, sortField = 'title', sortOrder = 'asc') {
		return items.sort((a, b) => {
			return (a[sortField] < b[sortField] ? -1 : 1) * (sortOrder === 'asc' ? 1 : -1);
		});
	}

	searchUser(filter, users) {
		return filter && (filter.lastName !== '' || filter.firstName !== '' || filter.email !== '' || filter.displayName !== '') ? users.filter(user => {
			return (user.displayName && user.displayName.indexOf(filter.displayName) > -1)
				|| (user.firstName && user.firstName.indexOf(filter.firstName) > -1)
				|| (user.lastName && user.lastName.indexOf(filter.lastName) > -1)
				|| (user.email && user.email.indexOf(filter.email) > -1);
		}) : users;
	}
}
