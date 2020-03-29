import { handleActions, createAction } from "redux-actions";

export type HeaderLoading = boolean;

export const INITIAL_STATE = false;

// HeaderLoading
export const START_HEADER_LOADING = "START_HEADER_LOADING"; 
export const END_HEADER_LOADING = "END_HEADER_LOADING";

export const startHeaderLoading = createAction(START_HEADER_LOADING);
export const endHeaderLoading = createAction(END_HEADER_LOADING);

export default handleActions<HeaderLoading, any>({
    [START_HEADER_LOADING]: (state) =>  true,
    [END_HEADER_LOADING]: (state) => false,
}, INITIAL_STATE)
