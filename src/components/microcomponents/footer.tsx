import * as React from "react";
import { FC } from "react";
import { AiOutlineMail, AiFillGithub, AiOutlineWarning } from "react-icons/ai";
const Footer: FC = () => {
  return (
    <footer>
      <div className="rowContainer">
        <div className="rightDiv">
          <p>
            What is Aelous? <br />
            It's a simple weather app.
            
          </p>
          <p></p>
        </div>
        <ul>
          <li>
            <AiOutlineMail></AiOutlineMail>
            email:<span>....</span>
          </li>
          <li>
            <AiFillGithub></AiFillGithub>
            github:<span>....</span>
          </li>
        </ul>
        <p>
          <AiOutlineWarning></AiOutlineWarning>
          Read the report on my github <br /> for further informations.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
