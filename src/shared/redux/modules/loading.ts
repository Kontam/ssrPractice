import { handleActions, createAction } from "redux-actions";

export type Loading = boolean;

export const INITIAL_STATE = false;

// Loading
export const START_LOADING = "START_LOADING"; 
export const END_LOADING = "END_LOADING";

export const startLoading = createAction(START_LOADING);
export const endLoading = createAction(END_LOADING);

export default handleActions<Loading, any>({
    [START_LOADING]: (state) =>  true,
    [END_LOADING]: (state) => false,
}, INITIAL_STATE)