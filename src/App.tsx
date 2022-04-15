import React, { FC, useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { UserContext } from "./context/userContext";
import { useHistory } from "react-router-dom";
import SignIn from "./components/signIn";
import SignUp from "./components/signUp";
import Home from "./components/home";
import LoginHome from "./components/loginHome";
import PageNotFound from "./components/404";
import ToggleButton from "./components/microcomponents/toggleButton";
import Axios from "axios";
import "./styles/appStyle.css";

const App: FC = () => {
  const [userData, setUserData] = useState<any>({
    token: undefined,
    user: undefined,
  });
  const history = useHistory();

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      let token = localStorage.getItem("x-auth-token");
      if (token === null) {
        localStorage.setItem("x-auth-token", "");
        token = "";
      }
      const backendResponse = await Axios.post(
        "http://localhost:5000/users/isLoggedIn",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (backendResponse.data) {
        const userResponse = await Axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userResponse.data,
        });
      }
    };

    checkIfLoggedIn();
  }, []);
  return (
    <BrowserRouter>
      <ToggleButton />
      <UserContext.Provider value={{ userData, setUserData }}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signIn" exact component={SignIn} />
          <Route path="/signUp" exact component={SignUp} />
          <Route path="/home" exact component={LoginHome} />

          <Route path="/" component={PageNotFound} />
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
