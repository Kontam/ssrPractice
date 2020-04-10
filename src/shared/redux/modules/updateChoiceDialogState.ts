import { createAction, handleActions, Action } from "redux-actions";

export type UpdateChoiceDialogState = {
    isOpen: boolean,
    targetId: string,
}

const INITIAL_STATE :UpdateChoiceDialogState = {
    isOpen: false,
    targetId: "",
}

const OPEN_UPDATE_CHOICE_DIALOG = "OPEN_UPDATE_CHOICE_DIALOG";
const CLOSE_UPDATE_CHOICE_DIALOG = "CLOSE_UPDATE_CHOICE_DIALOG";

export const openUpdateChoiceDialog = createAction<string>(OPEN_UPDATE_CHOICE_DIALOG);
export const closeUpdateChoiceDialog = createAction(CLOSE_UPDATE_CHOICE_DIALOG);

export default handleActions({
    [OPEN_UPDATE_CHOICE_DIALOG]: (state, { payload }: Action<string>) => ({
        ...state,
        targetId: payload,
        isOpen: true, 
    }),
    [CLOSE_UPDATE_CHOICE_DIALOG]: (state) => ({
        ...state,
        isOpen: false 
    }),
}, INITIAL_STATE)
