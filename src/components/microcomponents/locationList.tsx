import * as React from "react";
import { FC, useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { InputContext } from "../../context/inputContext";
import { DisplayListContext } from "../../context/displayListContext";
import MessageNotifications from "../messageNotifications";
import { motion } from "framer-motion";

import Axios from "axios";

const LocationList: FC = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [locations, setLocations] = useState<string[]>([]);
  const { inputData, setInputData } = useContext(InputContext);
  const { displayList, setDisplayList } = useContext(DisplayListContext);
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    console.log(displayList);
    const displayLocations = async () => {
      if (userData.user) {
        const userId = userData.user.id;
        const userIdO = { userId };
        const displayLocationsRes = await Axios.post(
          "http://localhost:5000/users/displayMyLocations",
          userIdO
        );
        if (displayLocationsRes) {
          setLocations(displayLocationsRes.data);
        }
      }
    };
    displayLocations();
  }, [inputData.isAdded]);

  return (
    <motion.div
      className="locationList"
      animate={{
        x: 50,
        opacity: 1,
        scale: [0, 1.4, 1],
        borderRadius: ["5%", "5%", "25%"],
      }}
      initial={{
        x: -100,
        opacity: 0,
      }}
    >
      {message && (
        <MessageNotifications
          message={message}
          eraseError={() => setMessage(undefined)}
        />
      )}
      <ul>
        {locations.map((location) => (
          <motion.div
            key={location}
            animate={{
              opacity: 1,
            }}
            initial={{
              opacity: 0,
            }}
            transition={{
              duration: 1,
            }}
          >
            <input
              className="locationOption"
              type="radio"
              key={location}
              value={location}
              name="location"
              onChange={(e) => setInputData({ inputValue: e.target.value })}
            />
            <label>{location}</label>
            <br></br>
          </motion.div>
        ))}

        <button
          className="deleteButton"
          onClick={async () => {
            try {
              const userId = userData.user.id;
              const location = inputData.inputValue;
              const userLocation = { userId, location };
              const deleteRes = await Axios.post(
                "http://localhost:5000/users/deleteFromMyList",
                userLocation
              );
              setInputData({
                isAdded: !inputData.isAdded,
                inputValue: "",
              });
              setMessage(deleteRes.data.msg);
            } catch (err: any) {
              err.response.data.msg && setMessage(err.response.data.msg);
            }
          }}
        >
          DELETE
        </button>
      </ul>
    </motion.div>
  );
};

export default LocationList;
