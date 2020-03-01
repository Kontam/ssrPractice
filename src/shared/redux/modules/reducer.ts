import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import longos from '../modules/longos';

const createReducer = (history :any) => {
    return combineReducers({
        longos,
        router: connectRouter(history),
    });
}

export default createReducer;