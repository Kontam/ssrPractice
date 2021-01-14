import { createAction, handleActions, Action } from "redux-actions";
import { take, call, put, takeEvery } from "redux-saga/effects";
import fetchr from "../util/fetchr";
import BFFConst from "../../modules/const";
import { setUserInfo, UserInfo } from "./userInfo";
import { Dispatch } from "redux";
import firebaseApp from "../../modules/firebaseAuthUtil";
import { startHeaderLoading, endHeaderLoading } from "./headerLoading";

export type AuthorityLevel =
  | typeof BFFConst.AUTHORITY_ADMIN
  | typeof BFFConst.AUTHORITY_MEMBER
  | typeof BFFConst.AUTHORITY_FREE
  | typeof BFFConst.AUTHORITY_NONE;

export type Login = {
  loggedIn: boolean;
  authority: AuthorityLevel;
};

export const INITIAL_STATE: Login = {
  loggedIn: false,
  authority: "none",
};

export const START_LOGIN = "START_LOGIN";
export const START_LOGOUT = "START_LOGOUT";
export const PROMISE_START_LOGIN = "PROMISE_START_LOGIN";

export const SET_LOGIN = "SET_LOGIN";
export const LOGOUT = "LOGOUT";

export const startLogin = createAction<UserInfo>(START_LOGIN);
export const startLogout = createAction(START_LOGOUT);

export type PromiseStartLoginPayload = {
  resolve: () => void;
  reject: () => void;
  userInfo: UserInfo;
};
const promiseStartLoginActionCreator = createAction<PromiseStartLoginPayload>(
  PROMISE_START_LOGIN
);
export const promiseStartLogin = (userInfo: UserInfo, dispatch: Dispatch) =>
  new Promise((resolve, reject) => {
    dispatch(promiseStartLoginActionCreator({ resolve, reject, userInfo }));
  });

export const setLogin = createAction<Login>(SET_LOGIN);
export const logout = createAction(LOGOUT);

function* loginFlow(payload: UserInfo) {
  yield put(startHeaderLoading());
  yield put(setUserInfo(payload));
  try {
    const result = yield call(
      [fetchr, fetchr.create],
      BFFConst.LOGIN_SERVICE,
      {},
      payload,
      {}
    );
    yield put(setLogin(result.data));
  } catch (error) {
    console.log(error);
  } finally {
    yield put(endHeaderLoading());
  }
}

function* startLoginSaga() {
  while (true) {
    const action = yield take(START_LOGIN);
    if (!action) return; // TODO: 調査 なぜかSSRで実行されてundefinedになる
    yield loginFlow(action.payload);
  }
}

function* promiseStartLoginSaga(action: Action<PromiseStartLoginPayload>) {
  //while(true) {
  // const action = yield take(PROMISE_START_LOGIN);
  //if (!action) return; // TODO: 調査 なぜかSSRで実行されてundefinedになる
  yield loginFlow(action.payload.userInfo);
  action.payload.resolve();
  //}
}

/**
 * ログアウト処理フローのSaga
 * loginStateに未ログイン時の値を挿入する
 * */
function* startLogoutSaga() {
  while (true) {
    yield take(START_LOGOUT);
    yield put(startHeaderLoading());
    yield firebaseApp.auth().signOut();
    if (typeof document !== "undefined") document.cookie = "token=; max-age0";
    yield put(logout());
    yield put(endHeaderLoading());
  }
}

export const loginSaga = [
  startLoginSaga(),
  startLogoutSaga(),
  //promiseStartLoginSaga(),
  takeEvery(PROMISE_START_LOGIN, promiseStartLoginSaga),
];

export default handleActions<Login, any>(
  {
    [SET_LOGIN]: (_, { payload }: Action<Login>) => ({
      ...payload,
      loggedIn: true,
    }),
    [LOGOUT]: () => ({
      ...INITIAL_STATE,
    }),
  },
  INITIAL_STATE
);
