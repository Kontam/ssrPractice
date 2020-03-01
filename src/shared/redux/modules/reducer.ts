import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import longos from '../modules/longos';

const createReducer = (history :any) => {
    return combineReducers({
        longos,
        form: formReducer,
        router: connectRouter(history),
    });
}

export default createReducer;