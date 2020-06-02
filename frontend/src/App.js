import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./App.css";

import HomePage from "./pages/homepage/HomePage";
import ShopPage from "./pages/shop/Shop";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/SignInAndSignUp";
import Checkout from "./pages/checkout/Checkout";
import Header from "./components/header/Header";
// import { setCurrentUser as SetCurrentUser } from "./redux/user";
import { selectCurrentUser } from "./redux/user/user.selector";
import { checkUserSession } from "./redux/user";

function App({ checkUserSession, currentUser }) {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={Checkout} />
        <Route
          path="/signin"
          render={() =>
            currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
          }
        />
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
