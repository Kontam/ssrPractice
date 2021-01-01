import * as firebase from 'firebase-admin';
import { Request, Response } from 'firebase-functions';
import { ChoiceOption } from '../types';
import admin from '../modules/firebaseAdmin';
import { CHOICE_GROUPS, CHOICE_OPTIONS } from './ChoiceGroupsAPI';
import { chooseItemsRandomly } from '../modules/util';
import { checkHttpHeaders } from '../modules/checkHttpHeaders';

export const getOptionsByGroupId = async (groupId: string, optionRef:firebase.firestore.CollectionReference): Promise<ChoiceOption[]> => {
  const snapshot = await optionRef.where('groupId', '==', groupId).get(); 
  const choiceOptions :ChoiceOption[] = snapshot.docs.map((doc) => {
    const data = doc.data();
    return ({
      choiceId: doc.id,
      choiceName: data.choiceName,
      choiceEnabled: data.choiceEnabled,
    });
  });

  return choiceOptions;
}

/**
 * グループ名から対応するオプションの配列を検索する
 * 本来ないはずだが、複数ヒットした場合は0番目を返す
 * @param groupName グループ名
 * @param groupRef グループコレクションのリファレンス
 * @param optionRef オプションコレクションのリファレンス
 */
export const getOptionsByGroupName = async (
  groupName: string,
  groupRef:firebase.firestore.CollectionReference,
  optionRef:firebase.firestore.CollectionReference
): Promise<ChoiceOption[] | null> => {
  const snapshot = await groupRef.where('groupName', '==', groupName).get(); 
  if (snapshot.empty) return null;
  const groupIds = snapshot.docs.map((doc) => doc.id);
  const optionSnap = await optionRef.where('groupId', '==', groupIds[0]).get();
  const choiceOptions :ChoiceOption[] = optionSnap.docs.map((doc) => {
    const data = doc.data();
    return ({
      choiceId: doc.id,
      choiceName: data.choiceName,
      choiceEnabled: data.choiceEnabled,
    });
  });

  return choiceOptions;
}

export default async function ChoiceOptionAPI(req: Request, res: Response) {
  if (!checkHttpHeaders(req, res)) return;

  const firestore = admin.firestore();
  const groupRef = firestore.collection(CHOICE_GROUPS);
  const optionRef = firestore.collection(CHOICE_OPTIONS)
  console.log(req.query);

  switch(req.method) {
    case "GET":
      if (!req.query.groupName) res.send("invalid request");
      const groupName = req.query.groupName;

      if (typeof groupName !== 'string') {
        res.send("invalid group name");
        return;
      }

      if (!req.query.amount || typeof req.query.amount !== 'string') {
        res.send('invalid amount');
        return;
      }

      const amount = parseInt(req.query.amount);

      if (typeof groupName !== 'string') {
        res.send("invalid group name");
        return;
      }

      const Options = await getOptionsByGroupName(groupName, groupRef, optionRef); 
      if (!Options) {
        res.send({
          error: true,
          reason: "invalid groupName",
        })
        return;
      }
      const enableOptions = Options.filter((option) => option.choiceEnabled);
      const choosenOptions = chooseItemsRandomly(enableOptions, amount);
      const response: string[] = choosenOptions.map(option => option.choiceName);
      
      res.send(response);
  }

}
