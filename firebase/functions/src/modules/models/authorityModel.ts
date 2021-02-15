import { BaseModel } from "./BaseModel";
import { CollectionReference } from "@google-cloud/firestore";

export class AuthorityModel extends BaseModel {
  USER_AUTHORITY= "user_authority" as const;
  DOMAIN_AUTHORITY= "domain_authority" as const;
  userAuthorityRef: CollectionReference<any>;
  domainAuthorityRef: CollectionReference<any>;

  constructor() {
    super();
    this.userAuthorityRef = this.firestore.collection(this.USER_AUTHORITY);
    this.domainAuthorityRef = this.firestore.collection(this.DOMAIN_AUTHORITY);
  }

  async getAuthority(email: string) {
    const userSnap = await this.userAuthorityRef.where('email', '==', email).get();
    let result = { authority: 'none' };
    if (!userSnap.empty) {
      userSnap.forEach((doc) => {
        result = {
          authority: doc.data().authority,
        } 
      })
      return result;
    }

    // ドメインマッチチェック
    const domainSnap = await this.domainAuthorityRef.get();
    domainSnap.forEach(doc => {
      const domain = doc.data().domain; 
      const reg = new RegExp("@" + domain + "$");
      const match = reg.exec(email);
      if (match && match.length > 0) {
        result = { authority: doc.data().authority }
      }
    });
    return result;
  }
}
