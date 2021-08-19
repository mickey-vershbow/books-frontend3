import React from "react";
import { FaAngleDoubleDown } from "react-icons/fa";

import { Link } from 'react-router-dom';


function Landing() {
  return (
    <>
      <div className="landing">
        <div className="landing__text">
          <h1 className="landing__text landing__text--h1">Welcome</h1>
          <h2 className="landing__text landing__text--h2">
            NYTimes Bestseller Books Archive
          </h2>
          <Link to="/home">
            <FaAngleDoubleDown />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Landing;
