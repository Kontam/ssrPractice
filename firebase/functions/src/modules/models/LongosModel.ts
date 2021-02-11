import { BaseModel } from "./BaseModel";
import { Longo } from '../../types.d';
import { CollectionReference } from "@google-cloud/firestore";
import { checkIsEmptyById } from "../util";
import { SuebotAPIExeption } from "../../classes/SuebotAPIException";

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

  async patchLongo(longo: Longo) {
    if (!(await checkIsEmptyById(this.longosRef, longo.id))) {
      throw new SuebotAPIExeption(`${longo.id} is not exist`)
    }
    await this.longosRef.doc(longo.id).set(longo);
    return longo;
  }
}
