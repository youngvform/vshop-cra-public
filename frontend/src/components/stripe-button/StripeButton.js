import React from 'react';
import Stripe from 'react-stripe-checkout';
import axios from 'axios';

import logo from '../../assets/vshop-logo.png';

const StripeButton = ({ price, onSuccessCheckout, history }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_A4dXbN1Z8BBB5584KGj02AOy0002NCGV3J';

  const onToken = token => {
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token
      }
    })
      .then(res => {
        onSuccessCheckout();
        alert('Payment successful.');
        history.push('/');
      })
      .catch(err => {
        console.log('Payment error: ', JSON.stringify(err));
        alert(
          'There was an issue with your payment. Please check your credit card.'
        );
      });
  };

  return (
    <Stripe
      name="VShop"
      label="Pay Now"
      billingAddress
      shippingAddress
      image={logo}
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeButton;
