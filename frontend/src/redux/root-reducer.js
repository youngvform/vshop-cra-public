import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user";
import cartReducer from "./cart";
import directoryReducer from "./directory";
import shopReducer from "./shop";

const persisConfig = {
  key: "root",
  storage,
  whitelist: ["cart"] // reducer name that assigned below combineReducer will persist.
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
});

export default persistReducer(persisConfig, rootReducer);
