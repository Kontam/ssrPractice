import { createAction, handleActions, Action } from "redux-actions";
import { take, call, put, takeEvery } from "redux-saga/effects";
import fetchr from "../util/fetchr";
import BFFConst from "../../../../bff/const";
import { setUserInfo, UserInfo } from "./userInfo";
import { Dispatch } from "redux";

export type Login = {
  loggedIn: boolean,
  authority: "administrator" | "member" | "none",
}

export const INITIAL_STATE: Login = {
  loggedIn: false,
  authority: "none"
}

export const START_LOGIN = "START_LOGIN";
export const START_LOGOUT = "START_LOGOUT";
export const PROMISE_START_LOGIN = "PROMISE_START_LOGIN";

export const SET_LOGIN = "SET_LOGIN";
export const REMOVE_LOGIN = "REMOVE_LOGIN";

export const startLogin = createAction<UserInfo>(START_LOGIN);

export type PromiseStartLoginPayload = {
  resolve: () => void
  reject: () => void
  userInfo: UserInfo
}
const promiseStartLoginActionCreator = createAction<PromiseStartLoginPayload>(PROMISE_START_LOGIN);
export const promiseStartLogin = (userInfo: UserInfo, dispatch: Dispatch) => new Promise((resolve, reject) => {
  console.log("inPromise", userInfo);
  dispatch(promiseStartLoginActionCreator({ resolve, reject, userInfo }));
});

export const setLogin = createAction(SET_LOGIN);

function* loginFlow(payload: UserInfo) {
    yield put(setUserInfo(payload));
    try {
      const result = yield call([fetchr, fetchr.create], BFFConst.LOGIN_SERVICE, {}, payload, {});
      console.log("startLoginSaga", result);
      yield put(setLogin(result.data));
    } catch(error) {
      console.log(error);
    }
}

function* startLoginSaga(){
  while(true) {
    const action = yield take(START_LOGIN);
    if (!action) return; // TODO: 調査 なぜかSSRで実行されてundefinedになる 
    yield loginFlow(action.payload);
  }
}

function* promiseStartLoginSaga(action : Action<PromiseStartLoginPayload>) {
  //while(true) {
   // const action = yield take(PROMISE_START_LOGIN);
    //if (!action) return; // TODO: 調査 なぜかSSRで実行されてundefinedになる 
    console.log("promiseStart", action);
    yield loginFlow(action.payload.userInfo);
    action.payload.resolve();
  //}
}

export const loginSaga = [
  startLoginSaga(),
  //promiseStartLoginSaga(),
  takeEvery(PROMISE_START_LOGIN, promiseStartLoginSaga),
];

export default handleActions<Login, any>({
  [SET_LOGIN]: (state, { payload }: Action<Login>) => ({
    loggedIn: true,
    ...payload,
  }),
  [REMOVE_LOGIN]: (state) => ({
    ...INITIAL_STATE,
  }),
}, INITIAL_STATE);

