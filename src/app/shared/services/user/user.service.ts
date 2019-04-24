import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IUser } from '../../../core/auth/_interfaces/user.interface';

@Injectable()
export class UserService {

	private collectionRef: AngularFirestoreCollection<IUser>;
	private path = `users`;

	private userRoles: string[] = [
		'admin', 'editor', 'subscriber'
	];

	users$: Observable<IUser[]>;

	constructor(private afs: AngularFirestore) {
		this.collectionRef = this.afs.collection<IUser>(this.path);
		this.users$ = this.collectionRef.valueChanges();
	}

	createUser(user: IUser): Promise<void> {
		user.id = this.afs.createId();
		return this.afs.collection<IUser>(this.path).doc(user.id).set(user);
	}

	removeUser(user: IUser): Promise<any> {
		return this.afs.collection<IUser>(this.path).doc(user.id).delete();
	}

	updateUser(userId: string, user: IUser): Promise<any> {
		return this.afs.collection<IUser>(this.path).doc(userId).update(user);
	}

	getUserById(userId: string): Observable<IUser> {
		return this.afs.doc<IUser>(this.path + '/' + userId).valueChanges();
	}

	getUserRoles(): string[] {
		return this.userRoles;
	}

}
