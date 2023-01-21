import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

// import thunkMiddleware from "redux-thunk";
import { authReducer } from "./reducers/authReducer";
import { messengerReducer } from "./reducers/messengerReducer";
import { cartReducer } from "../../../E_commerce/redux/reducers/cartReducers";
import { userRegisterLoginReducer } from "../../../E_commerce/redux/reducers/userReducers";
import { getCategoriesReducer } from "../../../E_commerce/redux/reducers/categoryReducers";
import { adminChatReducer } from "../../../E_commerce/redux/reducers/adminChatReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  messenger: messengerReducer,
  // E_commerce

  cart: cartReducer,
  userRegisterLogin: userRegisterLoginReducer,
  getCategories: getCategoriesReducer,
  adminChat: adminChatReducer,
  // End E_commerce
});

const cartItemsInLocalStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const userInfoInLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : sessionStorage.getItem("userInfo")
  ? JSON.parse(sessionStorage.getItem("userInfo"))
  : {};

// const userInfoInLocalStorage = localStorage.getItem("userInfo")
//   ? localStorage.getItem("userInfo")
//   : sessionStorage.getItem("userInfo")
//   ? sessionStorage.getItem("userInfo")
//   : {};

const INITIAL_STATE = {
  cart: {
    cartItems: cartItemsInLocalStorage,
    itemsCount: cartItemsInLocalStorage
      ? cartItemsInLocalStorage.reduce(
          (quantity, item) => Number(item.quantity) + quantity,
          0
        )
      : 0,
    cartSubtotal: cartItemsInLocalStorage
      ? cartItemsInLocalStorage.reduce(
          (price, item) => price + item.price * item.quantity,
          0
        )
      : 0,
  },
  userRegisterLogin: { userInfo: userInfoInLocalStorage },
};
// End E_commerce

const middleware = [thunk];

const store = createStore(
  rootReducer,
  // E commerce
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
