import * as firebase from 'firebase-admin';
import { Request, Response } from 'express';
import { ChoiceOption } from '../types';
import admin from '../modules/firebaseAdmin';
import { CHOICE_GROUPS, CHOICE_OPTIONS } from './ChoiceGroupsAPI';
import { chooseItemsRandomly } from '../modules/util';

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
): Promise<ChoiceOption[]> => {
  const snapshot = await groupRef.where('groupName', '==', groupName).get(); 
  const groupIds = await snapshot.docs.map((doc) => doc.id);
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
  const firestore = admin.firestore();
  const groupRef = firestore.collection(CHOICE_GROUPS);
  const optionRef = firestore.collection(CHOICE_OPTIONS)
  console.log(req.query);

  switch(req.method) {
    case "GET":
      if (!req.query.groupName) res.send("invalid request");
      let groupName: string = req.query.groupName;
      let amount = 0
      if (req.query.amount) {
        amount = parseInt(req.query.amount);
      }

      //TODO: choiceEnabledを考慮する
      const Options = await getOptionsByGroupName(groupName, groupRef, optionRef); 
      console.log("Options", Options);
      const enableOptions = Options.filter((option) => option.choiceEnabled);
      const choosenOptions = chooseItemsRandomly(enableOptions, amount);
      
      res.send(choosenOptions);
  }

}
