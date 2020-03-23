import * as admin from 'firebase-admin';

import BFFConst from '../const';

const serviceAccount = require('../../serviceAccount.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
