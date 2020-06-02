import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import FormInput from "../form-input/Form-Input";
import CustomButton from "../custom-button/Custom-Button";

import { signUpStart } from "../../redux/user";
import { selectUserError } from "../../redux/user/user.selector";

import "./SignUp.scss";

function SignUp({ signUpStart, userError }) {
  const [userInfo, setUserInfo] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const { displayName, email, password, confirmPassword } = userInfo;
  const handleSubmit = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    signUpStart({ email, password, displayName });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value
    });
  };

  return (
    <div className="sign-up">
      <h2 className="title">I don't have an account. </h2>
      <span>Sign up with your email and password.</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          handleChange={handleChange}
          label="Display Name"
          required
        />

        <FormInput
          type="email"
          name="email"
          value={email}
          handleChange={handleChange}
          label="Email"
          required
        />

        <FormInput
          type="password"
          name="password"
          value={password}
          handleChange={handleChange}
          label="Password"
          required
        />

        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          handleChange={handleChange}
          label="Confirm Password"
          required
        />
        <CustomButton type="submit">SIGN UP </CustomButton>
      </form>
      {userError && <h2 className="errMsg">Error : {userError}</h2>}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  userError: selectUserError
});

const mapDispatchToProps = dispatch => ({
  signUpStart: userInfo => dispatch(signUpStart(userInfo))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
