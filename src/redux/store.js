import {createStore, applyMiddleware} from 'redux';
import rootReducer from "./reducers/root.reducer";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const bindMiddleWare = middleware => {
    if (process.env.NODE_ENV !== 'production') {
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware);
}

 const initStore = () => {
    return createStore(rootReducer,bindMiddleWare([thunk]));
};

export default initStore;
