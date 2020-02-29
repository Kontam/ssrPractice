import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware, RouterState } from 'connected-react-router';
import RootReducer from './modules/reducer';
import createReducer from './modules/reducer';

export type RootState = {
    router: RouterState,
};

export const initialState: Partial<RootState> = {};

export const initializeStore = (history: any, initialState: Partial<RootState> = {}) => {
    const store = createStore(
        createReducer(history),
        initialState,
        applyMiddleware(routerMiddleware(history)),
    );

    return store;
}