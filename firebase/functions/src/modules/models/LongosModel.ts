import { BaseModel } from "./BaseModel";
import { Longo } from '../../types.d';
import { CollectionReference } from "@google-cloud/firestore";

export class LongosModel extends BaseModel {
  LONGOS = "Longos" as const;
  longosRef: CollectionReference<any>;

  constructor() {
    super();
    this.longosRef = this.firestore.collection(this.LONGOS);
  }

  async getLongs() {
    const snapshot = await this.longosRef.get();
    if (snapshot.empty) {
      return [];
    }
    const longos: Longo[] = [];
    snapshot.forEach(doc => {
      longos.push({
        ...(doc.data() as Longo),
        id: doc.id
      });
    });

    return longos;
  }

  async postLongo(longo: Longo) {
      const newDocRef = await this.longosRef.add(longo);
      const res = {
        ...(await newDocRef.get()).data(),
        id: newDocRef.id
      };
      return res;
  }
}
