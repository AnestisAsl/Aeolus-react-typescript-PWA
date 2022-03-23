import * as React from "react";
import SearchBar from "./microcomponents/searchbar";
import Footer from "./microcomponents/footer";
import { useContext, FC, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { useHistory } from "react-router-dom";
import Header from "./microcomponents/header";
import LocationList from "./microcomponents/locationList";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { InputContext } from "../context/inputContext";

const LoginHome: FC = () => {
  const history = useHistory();
  const { userData, setUserData } = useContext(UserContext);
  const [displayList, setDisplayList] = useState<boolean>(false);
  const [inputData, setInputData] = useState<any>({
    isAdded: false,
    inputValue: "",
  });
  useEffect(() => {
    var userObjFromLocalStorage: any = localStorage.getItem("auth-user");
    var tokenFromLocalStorage: any = localStorage.getItem("auth-token");
    if (userData.token === undefined) {
      setUserData({
        token: tokenFromLocalStorage,
        user: JSON.parse(userObjFromLocalStorage),
      });
    }
    if (!localStorage.getItem("auth-token")) {
      history.push("/");
    }
  }, [userData]);
  return (
    <div className="container">
      <Header></Header>
      <GiHamburgerMenu
        size={30}
        onClick={() => setDisplayList(!displayList)}
        className={
          displayList ? "buttonToLocationListAnimated" : "buttonToLocationList"
        }
      ></GiHamburgerMenu>
      <GrClose
        className={
          displayList
            ? "buttonToLocationListCloseAnimated"
            : "buttonToLocationListClose"
        }
        size={30}
        onClick={() => setDisplayList(!displayList)}
      ></GrClose>
      <InputContext.Provider value={{ inputData, setInputData }}>
        {displayList && <LocationList></LocationList>}
        <SearchBar></SearchBar>
      </InputContext.Provider>
      <Footer></Footer>
    </div>
  );
};

export default LoginHome;
