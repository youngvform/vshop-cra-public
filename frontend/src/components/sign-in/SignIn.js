import React, { useState } from "react";
import { connect } from "react-redux";
import "./SignIn.scss";

import FormInput from "../form-input/Form-Input";
import CustomButton from "../custom-button/Custom-Button";
import { googleSignInStart, emailSignInStart } from "../../redux/user";

function SignIn({ emailSignInStart, googleSignInStart }) {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const { email, password } = user;
  const handleChange = e => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    emailSignInStart(email, password);
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password!</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          value={email}
          handleChange={handleChange}
          label="email"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handleChange}
          label="password"
          required
        />
        <div className="buttons">
          <CustomButton type="submit">SIGN IN!</CustomButton>
          <CustomButton
            type="button"
            isGoogleSignIn
            onClick={googleSignInStart}
          >
            SIGN IN WITH GOOGLE!
          </CustomButton>
        </div>
      </form>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password }))
});

export default connect(
  null,
  mapDispatchToProps
)(SignIn);
