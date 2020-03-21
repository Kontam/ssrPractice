import { createAction, handleActions, Action } from "redux-actions";

export type UpdateDialogState = {
    isOpen: boolean,
    targetId: string,
}

const INITIAL_STATE :UpdateDialogState = {
    isOpen: false,
    targetId: "",
}

export const OPEN_UPDATE_DIALOG = "OPEN_UPDATE_DIALOG";
export const CLOSE_UPDATE_DIALOG = "CLOSE_UPDATE_DIALOG";

export const openUpdateDialog = createAction<string>(OPEN_UPDATE_DIALOG);
export const closeUpdateDialog = createAction(CLOSE_UPDATE_DIALOG);

export default handleActions<UpdateDialogState, any>({
    [OPEN_UPDATE_DIALOG]: (state, { payload }: Action<string>) => ({
        ...state,
        targetId: payload,
        isOpen: true, 
    }),
    [CLOSE_UPDATE_DIALOG]: (state) => ({
        ...state,
        isOpen: false 
    }),
}, INITIAL_STATE)