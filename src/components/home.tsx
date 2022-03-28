import * as React from "react";
import Footer from "./microcomponents/footer";
import Header from "./microcomponents/header";
import Wheel from "./microcomponents/wheel";

import { FC } from "react";

const Home: FC = () => {
  return (
    <div className="container">
      <Header></Header>

      <div className="rowContainer">
        <span>
          <h1>Because weather is not a matter of luck.</h1>
          <p>
            Login so you can have access to detailed weather informations.
            <br />
            Aeolus is a project just for web development practise.
            <br />
            <span className="bold"> Frequently asked questions:</span> <br />
         
            <br />
            How you came up with this name? <br />
            Read this :{" "}
            <a
              href="https://en.wikipedia.org/wiki/Aeolus"
              data-testid="link-aeolus"
            >
              Aeolus
            </a>
          </p>
        </span>
        {/* <Wheel></Wheel> */}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
