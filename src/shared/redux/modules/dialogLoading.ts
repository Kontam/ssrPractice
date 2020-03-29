import { handleActions, createAction } from "redux-actions";

export type DialogLoading = boolean;

export const INITIAL_STATE = false;

// DialogLoading
export const START_DIALOG_LOADING = "START_DIALOG_LOADING"; 
export const END_DIALOG_LOADING = "END_DIALOG_LOADING";

export const startDialogLoading = createAction(START_DIALOG_LOADING);
export const endDialogLoading = createAction(END_DIALOG_LOADING);

export default handleActions<DialogLoading, any>({
    [START_DIALOG_LOADING]: (state) =>  true,
    [END_DIALOG_LOADING]: (state) => false,
}, INITIAL_STATE)
