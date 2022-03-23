import * as React from "react";
import { useContext, FC, useState } from "react";
import { UserContext } from "../context/userContext";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import MessageNotifications from "./messageNotifications";
import { FaUserAlt, FaCloudMoon } from "react-icons/fa";
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { WiDayCloudy } from "react-icons/wi";

const SignUp: FC = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [confirmPassword, setconfirmPassword] = useState<string>();
  const { setUserData } = useContext(UserContext);
  const history = useHistory();
  const [passwordState, setPasswordState] = useState<string>("password");
  const handleSubmit = async (event: any) => {
    try {
      event.preventDefault();
      const registeredUser = { email, password, confirmPassword };
      await Axios.post("http://localhost:5000/users/register", registeredUser);

      const loginRes = await Axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      localStorage.setItem("auth-user", JSON.stringify(loginRes.data.user));
      history.push("/home");
    } catch (err: any) {
      err.response.data.msg && setMessage(err.response.data.msg);
    }
  };
  return (
    <div className="rowContainer">
      {/* <WiDayCloudy className="iconShadowSun" data-testid="cloudSun-icon" />
      <FaCloudMoon className="iconShadowMoon" data-testid="cloudMoon-icon" /> */}
      {/* <h1 className="background">AEOLUS</h1> */}

      <div className="container">
        <form onSubmit={handleSubmit} data-testid="form">
          <h1>SIGN UP</h1>
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
              onChange={(e) => setEmail(e.target.value)}
              aria-label="usernameInput"
              required
            />
          </div>
          <label>Password</label>
          <div className="rowContainer">
            {/* <RiLockPasswordLine fontSize={32} className="signIcon" /> */}
            <input
              type={passwordState}
              placeholder="type your password here..."
              onChange={(e) => setPassword(e.target.value)}
              aria-label="passwordInput"
              required
            />
          </div>
          <label>Confirm Password</label>
          <div className="rowContainer">
            {/* <RiLockPasswordFill fontSize={32} className="signIcon" /> */}
            <input
              type={passwordState}
              placeholder="type your password again  here..."
              onChange={(e) => setconfirmPassword(e.target.value)}
              aria-label="confirmPasswordInput"
              required
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
            className="visiblePasswordButton"
            data-testid="visibility-button"
          >
            <BsEye
              onClick={() => setPasswordState("text")}
              fontSize={32}
              data-testid="visibility-button-click-password"
            />
          </button>
        ) : (
          <button className="visiblePasswordButton">
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

export default SignUp;
