import admin from '../firebaseAdmin';
import * as _firestore from '@google-cloud/firestore';

export class BaseModel {
  firestore: _firestore.Firestore;
  firestoreModule: any;

  constructor() {
    this.firestoreModule = admin.firestore;;
    this.firestore = admin.firestore();
  }

}
