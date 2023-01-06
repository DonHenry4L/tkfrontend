import { createStore, compose, combineReducers, applyMiddleware } from "redux";

import thunkMiddleware from "redux-thunk";
import { authReducer } from "./reducers/authReducer";
import { messengerReducer } from "./reducers/messengerReducer";
import { cartReducer } from "../../../E_commerce/redux/reducers/cartReducers";
import { userRegisterLoginReducer } from "../../../E_commerce/redux/reducers/userReducers";
import { getCategoriesReducer } from "../../../E_commerce/redux/reducers/categoryReducers";



const rootReducer = combineReducers({
  auth: authReducer,
  messenger: messengerReducer,
  // E_commerce

  cart: cartReducer,
  userRegisterLogin: userRegisterLoginReducer,
  getCategories: getCategoriesReducer
  // End E_commerce
});

const cartItemsInLocalStorage = localStorage.getItem("cart") ? localStorage.getItem("cart") : [];

// E_commerce
// const userInfoInLocalStorage = localStorage.getItem("userInfo")
// ? JSON.parse(localStorage.getItem("userInfo"))
// : sessionStorage.getItem("userInfo")
// ? JSON.parse(sessionStorage.getItem("userInfo"))
// : {}
const userInfoInLocalStorage = localStorage.getItem("userInfo")
? localStorage.getItem("userInfo")
: sessionStorage.getItem("userInfo")
? sessionStorage.getItem("userInfo")
: {}

const INITIAL_STATE = {
  cart: {
    cartItems: cartItemsInLocalStorage,
    itemsCount: cartItemsInLocalStorage ? cartItemsInLocalStorage.reduce((quantity, item) => Number(item.quantity) + quantity, 0) : 0,
    cartSubtotal: cartItemsInLocalStorage ? cartItemsInLocalStorage.reduce((price, item) => price + item.price * item.quantity, 0) : 0
},
  userRegisterLogin: { userInfo: userInfoInLocalStorage },
};
// End E_commerce

const middleware = [thunkMiddleware];

const store = createStore(
  rootReducer,
  // E commerce
  INITIAL_STATE,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
