import admin from '../modules/firebaseAdmin';
import { Request, Response } from 'firebase-functions';
import { getOptionsByGroupId } from './ChoiceOptionsAPI';

/**
 * 選択肢グループテーブルのDBレコード
 * */
export type ChoiceGroupDB = {
  groupName: string,
  createdAt: string,
}

/**
 * 選択肢テーブルのDBレコード
 * */
export type ChoiceOptionDB = {
  groupId: string,
  choiceEnabled: boolean,
  createdAt: string,
  choiceName: string,
}

/**
 * クライアントで扱う選択肢データ
 * */
export type ChoiceOption = {
  choiceName: string,
  choiceEnabled: boolean,
  choiceId: string,
}

/**
 * クライアントで扱う選択肢グループデータ
 * */
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

    case "POST" :
      const newPost: Partial<ChoiceGroup> = request.body;
      const timeStamp = admin.firestore.FieldValue.serverTimestamp();
      // choiceOptionsとchoiceGroupは別のコレクション
      // groupとoptionの紐付きはoption側で親のIDを保持して実現する
      const newGroupRef = await groupRef.add(
        { 
          groupName: newPost.groupName,
          createdAt: timeStamp,
        }
      );

      // レスポンスのため、挿入されたグループデータを取得
      const groupData = (await (await newGroupRef.get()).data() as ChoiceGroupDB);
      if (!newPost.choiceOptions || newPost.choiceOptions.length === 0) {
        response.send(groupData);
        break;
      } 

      // グループに紐づくOptionを全てgroupIdを付与して挿入する
      const newOptionRefs = await Promise.all(newPost.choiceOptions.map(
        async (option: ChoiceOption) => await optionRef.add({
          choiceName: option.choiceName,
          choiceEnabled: option.choiceEnabled,
          groupId: newGroupRef.id,
          createdAt: timeStamp, 
      }))); 
      
      // レスポンスのため、挿入されたオプションデータを全て取得
      const optionsData = await Promise.all(newOptionRefs.map(
        async (ref): Promise<ChoiceOption> => {
          const insertedData = await (await ref.get()).data();
          return {
            choiceEnabled: insertedData!.choiceEnabled,
            choiceName: insertedData!.choiceName,
            choiceId: ref.id,
          }
        }));

      const res: ChoiceGroup = {
        groupId: newGroupRef.id,
        groupName: groupData && groupData.groupName || "", 
        choiceOptions: optionsData || [],
      }
      console.log("optionsData", optionsData);
      response.send(res);
      break;

    default:
      response.send("default");
  }
}
