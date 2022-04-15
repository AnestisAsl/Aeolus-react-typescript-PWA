import * as React from "react";
import { useContext, FC, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { useHistory } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { InputContext } from "../context/inputContext";
import { DisplayListContext } from "../context/displayListContext";
import { motion } from "framer-motion";
import Header from "./microcomponents/header";
import LocationList from "./microcomponents/locationList";
import SearchBar from "./microcomponents/searchbar";
import Footer from "./microcomponents/footer";

const LoginHome: FC = () => {
  const history = useHistory();

  const { userData, setUserData } = useContext(UserContext);
  const [displayList, setDisplayList] = useState<boolean>(false);
  const [inputData, setInputData] = useState<any>({
    isAdded: false,
    inputValue: "",
  });
  useEffect(() => {
    if (!localStorage.getItem("x-auth-token")) {
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
