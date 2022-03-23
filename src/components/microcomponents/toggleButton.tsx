import * as React from "react";
import { useState, useEffect } from "react";

const ToggleButton: React.FC = () => {
  const [theme, setTheme] = useState<string>("light");
  const changeTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  useEffect(() => {
    const body = document.getElementsByTagName("BODY")[0];

    if (body.classList) {
      body.classList.remove(body.classList[0]);
    }
    body.classList.add(theme);
  }, [theme]);
  return (
    <label className="toggleButton">
      <input type="checkbox" />
      <span
        className="slidePseudoElement round"
        onClick={() => changeTheme()}
        data-testid="toggle-button"
      ></span>
    </label>
  );
};

export default ToggleButton;
