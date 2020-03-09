import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const serviceAccount = require('../serviceAccount.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

type Longo = {
    id: string,
    text: string,
    meaning: string,
    comment: string,
}

/**
 * 渡されたidのデータが存在するかをチェックする
 * @param ref チェック対象のcollectionのref
 * @param id チェック対象データのid
 * @return {boolean} 存在すればfalse
 */
async function checkIsEmptyById(ref :FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>, id: string) {
    return (await ref.doc(id).get()).exists;
}

export const longoAPI = functions.https.onRequest(async (request, response) => {
    const ref = admin.firestore().collection("Longos");
    switch (request.method) {
        case "GET" :
            const snapshot = await ref.get();
            if (snapshot.empty) {
                response.send({});
            }
            const longos :Longo[] = [];
            snapshot.forEach(doc => {
                longos.push({
                    ...(doc.data() as Longo),
                    id: doc.id,
                });
            })
            response.send(longos);
            break;

        case "PATCH":
            const params: Longo = request.body;
            if (! await checkIsEmptyById(ref, params.id)) {
                response.send(`${params.id} is not exist`);
                break;
            }
            await ref.doc(params.id).set(params);
            response.send(params);
            break;
        
        case "POST":
            const newPost: Partial<Longo> = request.body;
            //TODO: エラーチェックが公式に書いてないのでなにか考えたい
             await ref.add(newPost);
            response.send(newPost);
            break;
        
        case "DELETE":
            const deleteId: {id: string} = request.body;
            if (! await checkIsEmptyById(ref, deleteId.id)) {
                response.send(`${deleteId.id} is not exist`);
                break;
            }
            //TODO: エラーチェックが公式に書いてないのでなにか考えたい
            await ref.doc(deleteId.id).delete();
            response.send(deleteId);
            break;

        default :
            console.log(request.method);
    }
})
