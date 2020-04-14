import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

type FirebaseConfig = {
  databaseURL: string,
  storageBucket: string,
  projectId: string,
}

const firebaseConfig: FirebaseConfig  = JSON.parse(process.env.FIREBASE_CONFIG || ""); 

const serviceAccount = functions.config().general.devproject === firebaseConfig.projectId
  ? require('../../serviceAccountDev.json')
  : require('../../serviceAccount.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export default admin;
