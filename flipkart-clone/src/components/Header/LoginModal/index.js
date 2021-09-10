import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, signup as _signup } from "../../../actions";
import { Modal, MaterialInput, MaterialButton } from "../../MaterialUI";

const LoginMoadal = (props) => {

    const {
    loginModal,
    onClose,
    signup
    } = props;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch();

  const userSignup = () => {
    console.log({ firstName, lastName, email, password });
    const user = { firstName, lastName, email, password };
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      return;
    }

    dispatch(_signup(user));
  };

  useEffect(() => {
      if(auth.authenticate){
       setFirstName("");
       setLastName("");
       setEmail("");
       setPassword("");
      }
  }, [auth.authenticate])

  const userLogin = () => {
    if (signup) {
      userSignup();
    } else {
      dispatch(login({ email, password }));
    }
  };

  return (
    <Modal visible={loginModal} onClose={onClose}>
      <div className="authContainer">
        <div className="row">
          <div className="leftspace">
            <h2>Login</h2>
            <p>Get access to your Orders, Wishlist and Recommendations</p>
          </div>
          <div className="rightspace">
            <div className="loginInputContainer">
              {signup && (
                <MaterialInput
                  type="text"
                  label="Enter First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              )}

              {signup && (
                <MaterialInput
                  type="text"
                  label="Enter Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              )}

              <MaterialInput
                type="text"
                label="Enter Email/ Mobile number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <MaterialInput
                type="password"
                label="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                //   rightElement={<a href="#">Forgot?</a>}
              />

              <MaterialButton
                title={signup ? "Register" : "Login"}
                bgColor="#fb641b"
                textColor="#ffffff"
                style={{
                  margin: "40px 0 20px 0",
                }}
                onClick={userLogin}
              />

              <p style={{ textAlign: "center" }}>OR</p>

              <MaterialButton
                title="Request OTP"
                bgColor="#ffffff"
                textColor="#2874f0"
                style={{
                  margin: "20px 0",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LoginMoadal;
