import * as React from "react";
import { FC, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { GiTornado } from "react-icons/gi";
import { InputContext } from "../../context/inputContext";

const Header: FC = () => {
  const history = useHistory();
  const { userData, setUserData } = useContext(UserContext);

  return (
    <header>
      <h2>
        AEOLUS<GiTornado></GiTornado>
      </h2>
      <div className="buttonsDiv">
        {localStorage.getItem("x-auth-token") &&
        window.location.href === "http://localhost:3000/home" ? (
          <button
            type="submit"
            className="logOut"
            onClick={() => {
              setUserData({
                token: undefined,
                user: undefined,
              });
              localStorage.setItem("x-auth-token", "");
              localStorage.setItem("auth-user", "");
              localStorage.setItem("weatherData", "");
              history.push("/");
            }}
          >
            Log Out
          </button>
        ) : (
          <>
            <button
              type="submit"
              onClick={() => {
                history.push("/signIn");
              }}
            >
              Sign In
            </button>
            <button
              type="submit"
              onClick={() => {
                history.push("/signUp");
              }}
            >
              Sign Up{" "}
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
