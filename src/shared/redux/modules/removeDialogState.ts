import { createAction, handleActions, Action } from "redux-actions";

export type RemoveDialogState = {
    isOpen: boolean,
    targetId: string,
}

const INITIAL_STATE :RemoveDialogState = {
    isOpen: false,
    targetId: "",
}

const OPEN_REMOVE_DIALOG = "OPEN_REMOVE_DIALOG";
const CLOSE_REMOVE_DIALOG = "CLOSE_REMOVE_DIALOG";

export const openRemoveDialog = createAction<string>(OPEN_REMOVE_DIALOG);
export const closeRemoveDialog = createAction(CLOSE_REMOVE_DIALOG);

export default handleActions<RemoveDialogState, any>({
    [OPEN_REMOVE_DIALOG]: (state, { payload }: Action<string>) => ({
        ...state,
        targetId: payload,
        isOpen: true, 
    }),
    [CLOSE_REMOVE_DIALOG]: (state) => ({
        ...state,
        isOpen: false 
    }),
}, INITIAL_STATE)