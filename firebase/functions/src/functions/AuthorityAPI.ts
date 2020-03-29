import { Request, Response } from 'firebase-functions';
import firebaseAdmin from '../modules/firebaseAdmin';

type AuthorityReadParams = {
  email?: string,
}

type AuthorityReadResponse = {
  authority: string,
}


async function authorityAPIfunc(req: Request, res: Response) :Promise<void> {
  const userRef = firebaseAdmin.firestore().collection("user_authority");
  const domainRef = firebaseAdmin.firestore().collection("domain_authority");
  
  switch (req.method) {
    case "GET": 
      const params: AuthorityReadParams = req.query;
      if (!params.email) {
        res.send({ error: true, message: "invalid params" });
        return;
      }
      // 個別メールアドレスチェックが優先度高
      let responseData: AuthorityReadResponse = { authority: "none" };
      const result = await userRef.where('email', '==', params.email).get();
      if (!result.empty) {
        result.forEach(doc => {
          responseData = {
            authority: doc.data().authority,
        }});
        res.send(responseData);
      }

      // ドメインマッチチェック
      const domainSnap = await domainRef.get();
      domainSnap.forEach(doc => {
        if (!params.email) { res.end(); return }
        const domain = doc.data().domain; 
        const reg = new RegExp("@" + domain + "$");
        const match = reg.exec(params.email);
        if (match && match.length > 0) {
          responseData = { authority: doc.data().authority }
        }
      });
      res.send(responseData);
      break;
    default:   
  }
}

export default authorityAPIfunc;
