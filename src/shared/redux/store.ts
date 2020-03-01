import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware, RouterState } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import createReducer from './modules/reducer';
import { Longos } from './modules/longos';

export type RootState = {
    router: RouterState,
    longos: Longos,
};

export const initialState: Partial<RootState> = {};

export const initializeStore = (history: any, initialState: Partial<RootState> = {}) => {
    const store = createStore(
        createReducer(history),
        initialState,
        composeWithDevTools(applyMiddleware(routerMiddleware(history))),
    );

    return store;
}