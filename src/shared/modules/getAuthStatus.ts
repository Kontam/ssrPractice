import { AuthorityLevel, Login } from "../redux/modules/login";
import Const from './const';
import { checkAuthorityLevel } from '../routes/checkAuthorityLevel';
import { useState } from "react";

export type AuthStatus = 
  typeof Const.AUTHSTATUS_ENOUGH |
  typeof Const.AUTHSTATUS_NOT_ENOUGH |
   typeof Const.AUTHSTATUS_UNAUTHRIZED;

/**
 * コンポーネントが認証済みであるか、権限が足りているかの状態を返すフック
 * */
function getAuthStatus(login: Login, required: AuthorityLevel) {
  if (!login.loggedIn) {
    return (Const.AUTHSTATUS_UNAUTHRIZED);
  } else {
    return checkAuthorityLevel(login.authority, required)
    ? Const.AUTHSTATUS_ENOUGH
    : (Const.AUTHSTATUS_NOT_ENOUGH);
  }
}

export default getAuthStatus;
