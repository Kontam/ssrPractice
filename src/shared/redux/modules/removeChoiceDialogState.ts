import { createAction, handleActions, Action } from "redux-actions";

export type RemoveChoiceDialogState = {
    isOpen: boolean,
    targetId: string,
}

const INITIAL_STATE :RemoveChoiceDialogState = {
    isOpen: false,
    targetId: "",
}

const OPEN_REMOVE_CHOICE_DIALOG = "OPEN_REMOVE_CHOICE_DIALOG";
const CLOSE_REMOVE_CHOICE_DIALOG = "CLOSE_REMOVE_CHOICE_DIALOG";

export const openRemoveChoiceDialog = createAction<string>(OPEN_REMOVE_CHOICE_DIALOG);
export const closeRemoveChoiceDialog = createAction(CLOSE_REMOVE_CHOICE_DIALOG);

export default handleActions({
    [OPEN_REMOVE_CHOICE_DIALOG]: (state, { payload }: Action<string>) => ({
        ...state,
        targetId: payload,
        isOpen: true, 
    }),
    [CLOSE_REMOVE_CHOICE_DIALOG]: (state) => ({
        ...state,
        isOpen: false 
    }),
}, INITIAL_STATE)
