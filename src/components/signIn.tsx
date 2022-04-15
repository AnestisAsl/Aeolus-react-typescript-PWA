import * as React from "react";
import { useContext, FC, useState, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useHistory } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import MessageNotifications from "./messageNotifications";
import Axios from "axios";

const SignIn: FC = () => {
  const [email, setEmail] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [password, setPassword] = useState<string>();
  const { setUserData } = useContext(UserContext);
  const history = useHistory();
  const [passwordState, setPasswordState] = useState<string>("password");
  const body = document.getElementsByTagName("BODY")[0];
  const [name, setName] = useState<string>("name");
  const handleSubmit = async (event: any) => {
    try {
      event.preventDefault();
      const loginUser = { email, password };
      const loginRes = await Axios.post(
        "http://localhost:5000/users/login",
        loginUser
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("x-auth-token", loginRes.data.token);
      localStorage.setItem("auth-user", JSON.stringify(loginRes.data.user));

      history.push("/home");
    } catch (err: any) {
      err.response.data.msg && setMessage(err.response.data.msg);
    }
  };

  return (
    <div className="rowContainer">
      {/* <WiSunrise className="iconShadowSun" data-testid="sun-icon" />
      <RiMoonClearLine className="iconShadowMoon" data-testid="moon-icon" /> */}
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>LOGIN</h1>
          {message && (
            <MessageNotifications
              message={message}
              eraseError={() => setMessage(undefined)}
            />
          )}
          <label>Username</label>
          <div className="rowContainer">
            {/* <FaUserAlt fontSize={32} className="signIcon" /> */}
            <input
              type="text"
              placeholder="type your username here..."
              required
              onChange={(e) => setEmail(e.target.value)}
              aria-label="usernameInput"
            />
          </div>
          <label>Password</label>
          <div className="rowContainer">
            {/* <RiLockPasswordFill fontSize={32} className="signIcon" /> */}
            <input
              type={passwordState}
              placeholder="type your password here..."
              required
              onChange={(e) => setPassword(e.target.value)}
              aria-label="passwordInput"
            />
          </div>
          <button type="submit" className="submitButton">
            SUBMIT
          </button>
        </form>
        <button
          type="submit"
          className="backButton"
          onClick={() => history.push("/")}
        >
          BACK
        </button>
      </div>
      <div className="eyeDiv">
        {passwordState === "password" ? (
          <button
            className="visiblePasswordButtonIn"
            data-testid="visibility-button"
          >
            <BsEye
              onClick={() => setPasswordState("text")}
              fontSize={32}
              data-testid="visibility-button-click-password"
            />
          </button>
        ) : (
          <button className="visiblePasswordButtonIn">
            <BsEyeSlash
              onClick={() => setPasswordState("password")}
              fontSize={32}
              data-testid="visibility-button-click-text"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default SignIn;
