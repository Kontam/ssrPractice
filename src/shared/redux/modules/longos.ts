import { handleActions, createAction, Action } from 'redux-actions';
import { call, takeEvery, put } from 'redux-saga/effects';

export type Longo = {
    text: string,
    meaning: string,
    comment: string,
};

export type Longos = Longo[];

export const SET_LONGOS = "SET_LONGOS" as const;
export const CREATE_LONGO = "CREATE_LONGO" as const;
export const FETCH_LONGOS = "FETCH_LONGOS" as const;

export const initialState: Longos = [];

export const setLongos = createAction<Longos>(SET_LONGOS);
export const readLongos = createAction(FETCH_LONGOS);

const mockFetch = () => {
    return new Promise<Longos>((resolve) => setTimeout(() => {
        resolve([{
            text: "saga-text",
            meaning: "saga-mening",
            comment: "saga-comment"
        }])
    }, 1000))
}

function* fetchLongos() {
    const longos: Longos = yield call(mockFetch);
    yield put(setLongos(longos))
}

export function* longosSaga() {
    yield takeEvery(FETCH_LONGOS, fetchLongos);
}

export default handleActions<Longos, any>({
    [SET_LONGOS]: (state: Longos, action: Action<Longos>) => action.payload,
    [CREATE_LONGO]: (state: Longos, action: Action<Longo>) => ([
        ...state,
        action.payload,
    ]),
}, initialState);




