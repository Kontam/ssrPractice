import { createAction, handleActions } from "redux-actions";

export type AddChoiceDialogState = {
    isOpen: boolean,
}

const INITIAL_STATE :AddChoiceDialogState = {
    isOpen: false,
}

const OPEN_ADD_CHOICE_DIALOG = "OPEN_ADD_CHOICE_DIALOG";
const CLOSE_ADD_CHOICE_DIALOG = "CLOSE_ADD_CHOICE_DIALOG";

export const openAddChoiceDialog = createAction(OPEN_ADD_CHOICE_DIALOG);
export const closeAddChoiceDialog = createAction(CLOSE_ADD_CHOICE_DIALOG);

export default handleActions({
    [OPEN_ADD_CHOICE_DIALOG]: (state) => ({
        ...state,
        isOpen: true, 
    }),
    [CLOSE_ADD_CHOICE_DIALOG]: (state) => ({
        ...state,
        isOpen: false 
    }),
}, INITIAL_STATE)
