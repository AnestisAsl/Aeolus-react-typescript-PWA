import * as React from "react";
import { FC, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { GiTornado } from "react-icons/gi";
import { InputContext } from "../../context/inputContext";

const Header: FC = () => {
  const history = useHistory();
  const { userData, setUserData } = useContext(UserContext);
  const { inputData, setInputData } = useContext(InputContext);

  return (
    <header>
      <h2>
        AEOLUS<GiTornado></GiTornado>
      </h2>
      <div className="buttonsDiv">
        {localStorage.getItem("auth-token") ? (
          <button
            type="submit"
            className="logOut"
            onClick={() => {
              setUserData({
                token: undefined,
                user: undefined,
              });
              localStorage.setItem("auth-token", "");
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
