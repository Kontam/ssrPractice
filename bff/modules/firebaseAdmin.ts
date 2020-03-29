import * as admin from 'firebase-admin';

import BFFConst from '../../src/shared/modules/const';

const credential:admin.ServiceAccount= {
  projectId: BFFConst.FIREBASE_PROJECT_ID,
  clientEmail: BFFConst.FIREBASE_PROJECT_EMAIL,
  privateKey: BFFConst.FIREBASE_PROJECT_KEY,
}

admin.initializeApp({
  credential: admin.credential.cert(credential),
});

export default admin;
