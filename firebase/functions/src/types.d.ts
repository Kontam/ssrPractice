import * as firebase from 'firebase-admin';

export type Longo = {
    id: string,
    text: string,
    meaning: string,
    comment: string,
}

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
  createdAt: firebase.firestore.FieldValue,
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

/**
 * 仕様上のエラーが発生した際に返却するレスポンス
 * */
export type SuebotAPIError = {
  error: boolean;
  reason: any;
}