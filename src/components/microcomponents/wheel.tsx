import * as React from "react";

import { FC, useState } from "react";
import {
  WiTornado,
  WiNightLightning,
  WiDayWindy,
  WiDaySunny,
} from "react-icons/wi";
const Wheel: FC = () => {
  const [name, setName] = useState<string>("wheel");
  const triggerAnimation = () => {
    const min = 3000;
    const max = 5000;
    const randomNumber = min + Math.random() * (max - min);
    console.log(randomNumber);
    setName("wheel spin");
    setTimeout(() => {
      setName("wheel spin stopSpin");
    }, randomNumber);
  };
  return (
    <div className="containerWheel">
      <div className="arrow"></div>
      <div className={name} data-testid="wheel">
        <span>
          <WiTornado className="icon1" />
        </span>
        <span>
          {" "}
          <WiNightLightning className="icon2" />
        </span>
        <span>
          {" "}
          <WiDayWindy className="icon3" />
        </span>
        <span>
          {" "}
          <WiDaySunny className="icon4" />
        </span>
      </div>
      <button className="spinButton" onClick={triggerAnimation}>
        SPIN
      </button>
    </div>
  );
};
export default Wheel;
