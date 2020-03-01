import { handleActions, createAction, Action } from 'redux-actions';

export type Longo = {
    text: string,
    meaning: string,
    comment: string,
};

export type Longos = Longo[];

export const SET_LONGOS = "SET_LONGOS";

export const initialState: Longos = [];

export const setLongos = createAction(SET_LONGOS);

export default handleActions({
    [SET_LONGOS]: (state: Longos, action: Action<Longos>) => action.payload,
}, initialState);




