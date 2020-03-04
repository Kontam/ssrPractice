import { handleActions, createAction, Action } from 'redux-actions';

export type Longo = {
    text: string,
    meaning: string,
    comment: string,
};

export type Longos = Longo[];

export const SET_LONGOS = "SET_LONGOS" as const;
export const CREATE_LONGO = "CREATE_LONGO" as const;

export const initialState: Longos = [];

export const setLongos = createAction(SET_LONGOS);

export default handleActions<Longos, Longos>({
    [SET_LONGOS]: (state: Longos, action: Action<Longos>) => action.payload,
    [CREATE_LONGO]: (state: Longos, action: Action<Longos>) => action.payload,
}, initialState);




