export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existing = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

  if (!existing) {
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
  }

  return cartItems.map(cartItem =>
    cartItem.id === cartItemToAdd.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
  );
};

export function removeItemFromCart(cartItems, cartItemToRemove) {
  if (cartItemToRemove.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map(cartItem =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
}
