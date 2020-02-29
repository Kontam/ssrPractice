import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

const createReducer = (history :any) => {
    return combineReducers({
        router: connectRouter(history),
    });
}

export default createReducer;