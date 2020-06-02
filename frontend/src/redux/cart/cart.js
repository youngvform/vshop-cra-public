import { all, call, takeLatest, put } from 'redux-saga/effects';
import { addItemToCart, removeItemFromCart } from './cart.utils';
import { SIGN_OUT_SUCCESS } from '../user';

const TOGGLE_CART_HIDDEN = 'TOGGLE_CART_HIDDEN';
const ADD_ITEM = 'ADD_ITEM';
const CLEAR_ITEM = 'CLEAR_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const CLEAR_CART = 'CLEAR_CART';

export const toggleCartHidden = () => ({
  type: TOGGLE_CART_HIDDEN
});

export const addItem = item => ({
  type: ADD_ITEM,
  payload: item
});

export const clearItem = id => ({
  type: CLEAR_ITEM,
  payload: id
});

export const removeItem = item => ({
  type: REMOVE_ITEM,
  payload: item
});

export const clearCart = () => ({
  type: CLEAR_CART
});

export function* clearCartSaga() {
  yield put(clearCart());
}

export function* onClearCart() {
  yield takeLatest(SIGN_OUT_SUCCESS, clearCartSaga);
}

export function* cartSagas() {
  yield all([call(onClearCart)]);
}

const INITIAL_STATE = {
  hidden: true,
  cartItems: []
};

function cartReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden
      };
    case ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload)
      };
    case CLEAR_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload)
      };
    case REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload)
      };
    case CLEAR_CART:
      return {
        ...state,
        cartItems: []
      };
    default:
      return state;
  }
}

export default cartReducer;
