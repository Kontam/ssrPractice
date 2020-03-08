import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware, RouterState } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import createReducer from './modules/reducer';
import { Longos, longosSaga } from './modules/longos';
import { AddDialogState } from './modules/addDialogState';

export type RootState = {
    router: RouterState,
    longos: Longos,
    addDialogState: AddDialogState,
};
const sagaMiddleware = createSagaMiddleware();
export const initialState: Partial<RootState> = {};

export const initializeStore = (history: any, initialState: Partial<RootState> = {}) => {
    const store = createStore(
        createReducer(history),
        initialState,
        composeWithDevTools(applyMiddleware(routerMiddleware(history),sagaMiddleware)),
    );
    const rootSaga = function*(){
        yield all(
            longosSaga,
        );
    }
    sagaMiddleware.run(rootSaga);

    return store;
}