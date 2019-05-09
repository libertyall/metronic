import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategoryType } from '../../interfaces/category-type.interface';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable()
export class CategoryTypeService {

  private collectionRef: AngularFirestoreCollection<ICategoryType>;
  private path = `category-types`;

  public categoryTypes$: Observable<ICategoryType[]>;

  constructor(private afs: AngularFirestore) {
    this.collectionRef = this.afs.collection<ICategoryType>(this.path);
    this.categoryTypes$ = this.collectionRef.valueChanges();
  }

  getCategoryTypeByLink(categoryTypeLink: string): Observable<ICategoryType> {
    return this.afs.collection<ICategoryType>(this.path, ref => ref.where('link', '==', categoryTypeLink)).valueChanges().pipe(
      map((categoryTypes: ICategoryType[]) => {
        return categoryTypes.find((categoryType: ICategoryType) => {
          return categoryType.link === categoryTypeLink;
        });
      })
    );
  }

}
