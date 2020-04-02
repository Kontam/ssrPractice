import admin from '../modules/firebaseAdmin';
import { Request, Response } from 'firebase-functions';
import { getOptionsByGroupId } from './ChoiceOptionsAPI';

export type ChoiceOption = {
  choiceId: string,
  choiceName: string,
  choiceEnable: boolean,
}

export type ChoiceGroup = {
  groupId: string,
  groupName: string,
  choiceOptions: ChoiceOption[], 
}

const CHOICE_GROUPS = "ChoiceGroups" as const;
const CHOICE_OPTIONS = "ChoiceOptions" as const;

/**
 * choiceGroupを操作するAPI
 * 主にグループの編集で利用される想定
 * */
export default async function choiseGroupsAPI(request: Request, response: Response): Promise<void>{
  const firestore = admin.firestore();
  const groupRef = firestore.collection(CHOICE_GROUPS);
  const optionRef = firestore.collection(CHOICE_OPTIONS);
  switch (request.method) {
    case "GET" :
      const snapshot = await groupRef.get();
      if (snapshot.empty) {
        console.log(CHOICE_GROUPS, "empty");
        response.send({});
        return;
      }
    
      const promises = snapshot.docs.map(async (doc): Promise<ChoiceGroup> => ({
          ...(doc.data() as ChoiceGroup),
          groupId: doc.id,
          choiceOptions: await getOptionsByGroupId(doc.id, optionRef),
        }));
      

      const data = await Promise.all(promises);

      response.send(data);
      break;
    default:
      response.send("default");
  }
}
