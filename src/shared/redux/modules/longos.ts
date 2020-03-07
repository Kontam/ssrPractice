import { handleActions, createAction, Action } from 'redux-actions';
import { call, takeEvery, put } from 'redux-saga/effects';
import fetchr from '../util/fetchr';
import { updateParams } from '../../../../bff/services/longosService';
import ClientConst from '../../../ClientConst';

export type Longo = {
    id?: string,
    text: string,
    meaning: string,
    comment: string,
};

export type Longos = Longo[];

// Stateを変更するアクション
export const SET_LONGOS = "SET_LONGOS" as const;
export const ADD_LONGO = "ADD_LONGO" as const;
export const PATCH_LONGO = "PATCH_LONGO" as const; 

// Saga
export const FETCH_LONGOS = "FETCH_LONGOS" as const;
export const POST_LONGO = "POST_LONGO" as const;
export const UPDATE_LONGO = "UPDATE_LONGO" as const;

export const initialState: Longos = [];

export const setLongos = createAction<Longos>(SET_LONGOS);
export const addLongo = createAction<Longo>(ADD_LONGO);
export const patchLongo = createAction<Longo>(PATCH_LONGO);

// saga action
export const createLongo = createAction<Longo>(POST_LONGO);
export const readLongos = createAction(FETCH_LONGOS);
export const updateLongo = createAction<Longo>(UPDATE_LONGO);

function* requestFetchLongos() {
    const result = yield fetchr.read(ClientConst.longosDataName).params({id: "aaa"}).end();
    yield put(setLongos(result.data))
}

function* requestPostLongo({ payload }: Action<Longo>) {
    const result = yield fetchr.create(ClientConst.longosDataName).body(payload).end();
    yield put(addLongo(result.data));
}

function* requestPatchLongo({ payload }: Action<Longo>) {
    const result = yield fetchr.update(ClientConst.longosDataName).body(payload).end();
    yield put(patchLongo(result.data));
}

export const longosSaga = [
    takeEvery(FETCH_LONGOS, requestFetchLongos),
    takeEvery(POST_LONGO, requestPostLongo),
    takeEvery(UPDATE_LONGO, requestPatchLongo),
];

export default handleActions<Longos, any>({
    [SET_LONGOS]: (state: Longos, action: Action<Longos>) => action.payload,
    [ADD_LONGO]: (state: Longos, action: Action<Longo>) => ([
        ...state,
        action.payload,
    ]),
    [PATCH_LONGO]: (state: Longos, { payload }: Action<Longo>) => {
        return state.map((longo) => longo.id === payload.id ? payload : longo)
    }
}, initialState);



