import { createAction, handleActions } from "redux-actions";
import { User } from "firebase";
import { Action } from "redux-actions";

export type UserInfo = {
    displayName: string,
    uid: string,
    email: string,
    idToken?: string,
    cookieToken?: string,
}

export const INITIAL_STATE :UserInfo = {
    displayName: "",
    uid: "",
    email: "",
    idToken: "",
    cookieToken: "",
}

/**
 * CSの認証で取得できるUserオブジェクトをアプリで使用するデータに絞り込む
 * @params {User} user firebase-authのUserオブジェクト
 * @params {idToken} string firebase-authのidToken
 * @return {UserInfo} アプリケーションで利用するユーザー情報
 * */
export function convertUserObj(user :User, idToken: string): UserInfo{
  return {
    displayName: user.displayName || "",
    uid: user.uid || "",
    email: user.email || "",
    idToken,
  }
}

export const SET_USER_INFO = "SET_USER_INFO";
export const REMOVE_USER_INFO = "REMOVE_USER_INFO";

export const setUserInfo = createAction<UserInfo>(SET_USER_INFO);
export const removeUserInfo = createAction(REMOVE_USER_INFO);

export default handleActions<UserInfo, any>({
    [SET_USER_INFO]: (state, { payload }: Action<UserInfo>) => ({
      ...payload,
    }),
    [REMOVE_USER_INFO]: (state) => ({
      ...INITIAL_STATE,
    }),
}, INITIAL_STATE)
