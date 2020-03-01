import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const serviceAccount = require('../serviceAccount.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export const mockLongo = functions.https.onRequest(async (request, response) => {
    const collection = admin.firestore().collection("longs");
    console.log(collection);
    const data = await collection.doc("longo").set({a: "anan"});
    console.log(data);
    response.end();
})
