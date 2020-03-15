import { createAction, handleActions } from "redux-actions";

export type SnackBarState = {
    isOpen: boolean,
    message: string,
}

const INITIAL_STATE :SnackBarState = {
    isOpen: false,
    message: "",
}

const OPEN_SNACK_BAR = "OPEN_SNACK_BAR";
const CLOSE_SNACK_BAR = "CLOSE_SNACK_BAR";

export const openSnackBar = createAction<string>(OPEN_SNACK_BAR);
export const closeSnackBar = createAction(CLOSE_SNACK_BAR);

export default handleActions<SnackBarState, any>({
    [OPEN_SNACK_BAR]: (state, { payload }: { payload: string}) => ({
        ...state,
        isOpen: true, 
        message: payload,
    }),
    [CLOSE_SNACK_BAR]: (state) => ({
        ...state,
        isOpen: false 
    }),
}, INITIAL_STATE)