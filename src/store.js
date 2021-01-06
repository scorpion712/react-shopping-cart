import {createStore, applyMiddleware, combineReducers, compose} from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducer";
import {productsReducer} from "./reducers/productReducers";

const initialState  = {};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // useful for debug

const store = createStore(combineReducers({
    products: productsReducer,
    cart: cartReducer,
    }),
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);
export default store;