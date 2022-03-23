import * as React from "react";
import { Component } from "react";
import { AiFillCloud, AiFillThunderbolt } from "react-icons/ai";

import { useHistory } from "react-router-dom";

const PageNotFound: React.FC = () => {
  const history = useHistory();

  return (
    <div className="gridContainer">
      <AiFillCloud className="pageNotFoundIcons" />
      <AiFillCloud className="pageNotFoundIcons" />
      <AiFillCloud className="pageNotFoundIcons" />
      <AiFillCloud className="pageNotFoundIcons" />
      <AiFillCloud className="pageNotFoundIcons" />
      <AiFillCloud className="pageNotFoundIcons" />
      <AiFillThunderbolt className="thunder" />
      <span className="pageNotFoundTitle">404</span>
      <span className="messagePageNotFound">Error page not found.</span>
      <button
        type="submit"
        className="backButton"
        onClick={() => history.push("/")}
      >
        BACK
      </button>
    </div>
  );
};

export default PageNotFound;
