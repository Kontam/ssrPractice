import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware, RouterState } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import createReducer from './modules/reducer';
import loggerMiddleware from './middlewares/loggerMiddleware';
import { Longos, longosSaga } from './modules/longos';
import { AddDialogState } from './modules/addDialogState';
import { UpdateDialogState } from './modules/updateDialogState';
import { RemoveDialogState } from './modules/removeDialogState';
import { IsMounted } from './modules/isMounted';
import { SnackBarState } from './modules/snackBarState';
import { DialogLoading } from './modules/dialogLoading';
import { UserInfo } from './modules/userInfo';
import { loginSaga, Login } from './modules/login';
import { HeaderLoading } from './modules/headerLoading';

export type RootState = {
    router: RouterState,
    longos: Longos,
    addDialogState: AddDialogState,
    updateDialogState: UpdateDialogState,
    removeDialogState: RemoveDialogState,
    snackBarState: SnackBarState,
    dialogLoading: DialogLoading,
    isMounted: IsMounted,
    userInfo: UserInfo,
    login: Login,
    headerLoading: HeaderLoading,
};
export const INITIAL_STATE: Partial<RootState> = {};

export const initializeStore = (history: any, initialState: Partial<RootState> = {}) => {
const sagaMiddleware = createSagaMiddleware();
const rootSaga = function*(){
    yield all([
        ...longosSaga,
        ...loginSaga,
    ]);
}
    const store = createStore(
        createReducer(history),
        initialState,
        composeWithDevTools(applyMiddleware(
            routerMiddleware(history),
            sagaMiddleware,
            // loggerMiddleware,
        )),
    );
    sagaMiddleware.run(rootSaga);

    return store;
}
