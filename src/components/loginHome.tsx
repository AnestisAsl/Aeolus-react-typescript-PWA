import * as React from "react";
import SearchBar from "./microcomponents/searchbar";
import Footer from "./microcomponents/footer";
import { useContext, FC, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { useHistory } from "react-router-dom";
import Header from "./microcomponents/header";
import LocationList from "./microcomponents/locationList";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { InputContext } from "../context/inputContext";
import { DisplayListContext } from "../context/displayListContext";
import { motion } from "framer-motion";

const LoginHome: FC = () => {
  const history = useHistory();
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };
  const [isOpen, setIsOpen] = useState(false);

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
      <motion.button
        className="buttonToLocationList"
        onClick={() => setDisplayList(!displayList)}
        whileHover={{ scale: 1.4 }}
        whileTap={{ scale: 0.7 }}
        animate={{
          borderRadius: displayList ? "25%" : "50%",
        }}
        transition={{
          type: "spring",
          stiffness: 40,
        }}
      >
        {displayList ? <IoMdClose size={35} /> : <GiHamburgerMenu size={30} />}
      </motion.button>
      <InputContext.Provider value={{ inputData, setInputData }}>
        {displayList && (
          <DisplayListContext.Provider value={{ displayList, setDisplayList }}>
            <LocationList />
          </DisplayListContext.Provider>
        )}
        <SearchBar></SearchBar>
      </InputContext.Provider>
      <Footer></Footer>
    </div>
  );
};

export default LoginHome;
