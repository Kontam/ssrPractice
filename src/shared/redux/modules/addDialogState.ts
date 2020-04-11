import { createAction, handleActions } from "redux-actions";

export type AddDialogState = {
    isOpen: boolean,
}

const INITIAL_STATE :AddDialogState = {
    isOpen: false,
}

const OPEN_ADD_DIALOG = "OPEN_ADD_DIALOG";
const CLOSE_ADD_DIALOG = "CLOSE_ADD_DIALOG";

export const openAddDialog = createAction(OPEN_ADD_DIALOG);
export const closeAddDialog = createAction(CLOSE_ADD_DIALOG);

export default handleActions({
    [OPEN_ADD_DIALOG]: (state) => ({
        ...state,
        isOpen: true, 
    }),
    [CLOSE_ADD_DIALOG]: (state) => ({
        ...state,
        isOpen: false 
    }),
}, INITIAL_STATE)
