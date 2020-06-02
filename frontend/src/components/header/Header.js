import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import logo from "../../assets/vshop-logo.png";
import CartIcon from "../cart-icon/CartIcon";
import CartDropDown from "../cart-dropdown/CartDropDown";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { signOutStart } from "../../redux/user";

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
  SignOutButton
} from "./Header.styles";

const Header = ({ currentUser, toggleCartHidden, hidden, signOutStart }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <div className="logo">
        <img src={logo} alt="LOGO" />
      </div>
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to="/shop">SHOP</OptionLink>
      <OptionLink to="/contact">CONTACT</OptionLink>
      {!currentUser ? (
        <OptionLink to="/signin">SIGN IN</OptionLink>
      ) : (
        <SignOutButton onClick={signOutStart}>SIGN OUT</SignOutButton>
      )}
      <CartIcon onClick={toggleCartHidden} />
    </OptionsContainer>
    {!hidden && <CartDropDown />}
  </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
