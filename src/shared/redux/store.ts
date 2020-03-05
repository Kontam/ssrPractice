import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware, RouterState } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import createReducer from './modules/reducer';
import { Longos, longosSaga } from './modules/longos';

export type RootState = {
    router: RouterState,
    longos: Longos,
};
const sagaMiddleware = createSagaMiddleware();
export const initialState: Partial<RootState> = {};

export const initializeStore = (history: any, initialState: Partial<RootState> = {}) => {
    const store = createStore(
        createReducer(history),
        initialState,
        composeWithDevTools(applyMiddleware(routerMiddleware(history),sagaMiddleware)),
    );
    
    sagaMiddleware.run(longosSaga);

    return store;
}