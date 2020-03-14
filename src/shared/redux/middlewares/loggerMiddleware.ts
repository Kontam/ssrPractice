import { Middleware } from 'redux';

const loggerMiddleware: Middleware = (store) => (next) => (action) => {
    console.log("loggerMiddleware", action.type);
    next(action);
}

export default loggerMiddleware;