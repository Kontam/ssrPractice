import { createAction, handleActions, Action } from "redux-actions";

export type IsMounted = boolean;

export const INITIAL_STATE = false;

export const SET_TRUE_ISMOUNTED = "SET_TRUE_ISMOUNTED" as const;

export const setTrueIsMounted = createAction<void>(SET_TRUE_ISMOUNTED);

export default handleActions<IsMounted>({
    [SET_TRUE_ISMOUNTED]: () => true,
}, false)