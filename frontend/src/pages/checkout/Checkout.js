import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import './Checkout.scss';
import CheckoutItem from '../../components/checkout-item/CheckoutItem';
import {
  selectCartItems,
  selectCartTotal
} from '../../redux/cart/cart.selectors';
import { clearCart } from '../../redux/cart/cart';
import StripeButton from '../../components/stripe-button/StripeButton';

const Checkout = ({ cartItems, total, onSuccessCheckout, history }) => (
  <div>
    {cartItems.length ? (
      <div className="checkout-page">
        <div className="checkout-header">
          <div className="header-block">
            <span>Product</span>
          </div>
          <div className="header-block">
            <span>Description</span>
          </div>
          <div className="header-block">
            <span>Quantity</span>
          </div>
          <div className="header-block">
            <span>Price </span>
          </div>
          <div className="header-block">
            <span>Remove</span>
          </div>
        </div>
        {cartItems.map(cartItem => (
          <CheckoutItem key={cartItem.id} item={cartItem} />
        ))}
        <div className="total">
          <span>TOTAL : ${total}</span>
        </div>
        <div className="test-warning">
          Please use the following test credit card for payment.
          <br />
          4242 4242 4242 4242 / Exp: 1/20 / CVV: 123
        </div>
        <StripeButton
          price={total}
          onSuccessCheckout={onSuccessCheckout}
          history={history}
        />
      </div>
    ) : (
      <span className="empty-message">No item in cart</span>
    )}
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal
});

const mapDispatchToProps = dispatch => ({
  onSuccessCheckout: () => dispatch(clearCart())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Checkout));
