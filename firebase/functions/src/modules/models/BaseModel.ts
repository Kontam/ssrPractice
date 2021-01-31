import admin from '../firebaseAdmin';
import * as _firestore from '@google-cloud/firestore';

export class BaseModel {
  firestore: _firestore.Firestore;

  constructor() {
    this.firestore = admin.firestore();
  }

}
