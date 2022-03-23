import * as React from "react";
import { FC, useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { InputContext } from "../../context/inputContext";
import MessageNotifications from "../messageNotifications";

import Axios from "axios";

const LocationList: FC = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [locations, setLocations] = useState<string[]>([]);
  const { inputData, setInputData } = useContext(InputContext);
  const [message, setMessage] = useState<string>();

  useEffect(() => {
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
    <div className="locationList">
      {message && (
        <MessageNotifications
          message={message}
          eraseError={() => setMessage(undefined)}
        />
      )}
      <ul>
        {locations.map((location) => (
          <div key={location}>
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
          </div>
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
    </div>
  );
};

export default LocationList;
