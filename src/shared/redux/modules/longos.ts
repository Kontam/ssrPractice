import { handleActions, createAction, Action } from 'redux-actions';
import { takeEvery, put, call, fork, cancelled, take, cancel } from 'redux-saga/effects';
import fetchr from '../util/fetchr';
import ClientConst from '../../modules/const';
import { closeUpdateDialog, CLOSE_UPDATE_DIALOG } from './updateDialogState';
import { closeAddDialog } from './addDialogState';
import { closeRemoveDialog } from './removeDialogState';
import { openSnackBar } from './snackBarState';
import { startDialogLoading, endDialogLoading } from './dialogLoading';
import { startHeaderLoading, endHeaderLoading } from './headerLoading';

export type Longo = {
    id: string,
    text: string,
    meaning: string,
    comment: string,
    dialogLodaing: boolean,
};

export type Longos = Longo[];

// Stateを変更するアクション
export const SET_LONGOS = "SET_LONGOS" as const;
export const ADD_LONGO = "ADD_LONGO" as const;
export const PATCH_LONGO = "PATCH_LONGO" as const; 
export const REMOVE_LONGO = "REMOVE_LONGO" as const;

// Saga
export const FETCH_LONGOS = "FETCH_LONGOS" as const;
export const PROMISE_READ_LONGOS = "PROMISE_READ_LONGOS"; 
export const POST_LONGO = "POST_LONGO" as const;
export const UPDATE_LONGO = "UPDATE_LONGO" as const;
export const DELETE_LONGO = "DELETE_LONGO" as const;

export const INITIAL_STATE: Longos = [];

// State Cange
export const setLongos = createAction<Longos>(SET_LONGOS);
export const addLongo = createAction<Longo>(ADD_LONGO);
export const patchLongo = createAction<Longo>(PATCH_LONGO);
export const removeLongo = createAction<string>(REMOVE_LONGO);

// saga action
export const createLongo = createAction<Longo>(POST_LONGO);
export const readLongos = createAction(FETCH_LONGOS);
export const updateLongo = createAction<Longo>(UPDATE_LONGO);
export const deleteLongo = createAction<string>(DELETE_LONGO);
export const promiseReadLongos = createAction(PROMISE_READ_LONGOS);

/**
 * 論語取得処理
 */
function* requestFetchLongos() {
    yield put(startHeaderLoading());
    const result = yield fetchr.read(ClientConst.LONGOS_SERVICE).params({id: "aaa"}).end();
    yield put(setLongos(result.data))
    yield put(endHeaderLoading());
}

function* requestPostLongo({ payload }: Action<Longo>) {
    yield put(startDialogLoading());
    const result = yield fetchr.create(ClientConst.LONGOS_SERVICE).body(payload).end();
    yield put(addLongo(result.data));
    yield put(endDialogLoading());
    yield put(closeAddDialog());
    yield put(openSnackBar("アイテムを作成しました"));
}

/**
 * 論語編集処理　キャンセル処理テスト
 * アクションのキャンセルは正しく動作するが、APIのリクエストは完了してしまう
 * catchの処理にAPIに対してリセットをかける必要がある
 */
function* requestPatchLongo(payload: Longo) {
    try {
        const result = yield call([fetchr, fetchr.update], ClientConst.LONGOS_SERVICE, {}, payload, {});
        yield put(patchLongo(result.data));
        yield put(endDialogLoading());
        yield put(openSnackBar("編集が完了しました"));
        yield put(closeUpdateDialog());
        return "a";
    } catch (error) {
        console.log(error);
    } finally {
        if (yield cancelled()) {
            console.log("fork cancelled");
            yield put(endDialogLoading());
        }
    }
}

function* patchLongoFlow({ payload }: Action<Longo>) {
    yield put(startDialogLoading());
    const task = yield fork(requestPatchLongo, payload);
    yield take(CLOSE_UPDATE_DIALOG);
    yield cancel(task);
}

function* requestDeleteLongo({ payload }: Action<string>) {
    yield put(startDialogLoading());
    const result = yield fetchr.delete(ClientConst.LONGOS_SERVICE).params({id: payload}).end();
    yield put((removeLongo(result.data.id)));
    yield put(endDialogLoading());
    yield put(closeRemoveDialog());
    yield put(openSnackBar("アイテムを削除しました"));
}

function* promiseReadLongosSaga({ payload: { resolve, reject }} :any) {
    const result = yield fetchr.read(ClientConst.LONGOS_SERVICE).params({id: "aaa"}).end();
    yield put(setLongos(result.data)) 
    resolve(result)
}

export const longosSaga = [
    takeEvery(FETCH_LONGOS, requestFetchLongos),
    takeEvery(POST_LONGO, requestPostLongo),
    takeEvery(UPDATE_LONGO, patchLongoFlow),
    takeEvery(DELETE_LONGO, requestDeleteLongo),
    takeEvery(PROMISE_READ_LONGOS, promiseReadLongosSaga),
];

export default handleActions<Longos, any>({
    [SET_LONGOS]: (state: Longos, action: Action<Longos>) => action.payload,
    [ADD_LONGO]: (state: Longos, action: Action<Longo>) => ([
        ...state,
        action.payload,
    ]),
    [PATCH_LONGO]: (state: Longos, { payload }: Action<Longo>) => {
        return state.map((longo) => longo.id === payload.id ? payload : longo);
    },
    [REMOVE_LONGO]: (state: Longos, { payload }: Action<string>) => {
        return state.filter((longo) => longo.id !== payload);
    },
}, INITIAL_STATE);




