import { createAction, handleActions } from "redux-actions";
import { User } from "firebase";

export type UserInfo = {
    displayName: string,
    uid: string,
    email: string,
}

export const INITIAL_STATE :UserInfo = {
    displayName: "",
    uid: "",
    email: "",
}

export const SET_USER_INFO = "SET_USER_INFO";
export const REMOVE_USER_INFO = "REMOVE_USER_INFO";

export const setUserInfo = createAction<User>(SET_USER_INFO);
export const removeUserInfo = createAction(REMOVE_USER_INFO);

export default handleActions<UserInfo, any>({
    [SET_USER_INFO]: (state, { payload }: { payload: User }) => ({
      displayName: payload.displayName || "",
      email: payload.email || "",
      uid: payload.uid || "",
    }),
    [REMOVE_USER_INFO]: (state) => ({
      ...INITIAL_STATE,
    }),
}, INITIAL_STATE)
