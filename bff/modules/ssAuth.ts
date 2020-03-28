import { Request } from 'express';
import { SMCCookies } from '../';
import { UserInfo } from '../../src/shared/redux/modules/userInfo';
import adminApp from './firebaseAdmin';

export type SSAuth = {
  isAuthed: boolean,
  userInfo?: UserInfo,
}

/**
 * サーバーサイドでcookieのtokenを使用した認証を行う
 * cookieにtokenが存在しない場合はisAuthed: false
 * 存在する場合はUserInfoと一緒にisAuthed: trueを返す
 * @returns { Promise<SSAuth> } 認証結果とユーザー情報 
 * */
const ssAuth = async (req: Request): Promise<SSAuth> => {
  const cookies: SMCCookies = req.cookies;
  if (!cookies.token) return { isAuthed: false };
  const decodedCookieToken = await adminApp.auth().verifySessionCookie(cookies.token, true);
  const uid = decodedCookieToken.uid;
  const user = await adminApp.auth().getUser(uid);
  console.log("loginService",uid);

  const userInfo: UserInfo = {
    cookieToken: cookies.token,
    email: user.email || "",
    displayName: user.displayName || "",
    uid,
  }

  return { isAuthed: true, userInfo };
}

export default ssAuth;
