import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="jumbotron">
    <h1>Pluralsight Administration</h1>
    <p>React, Redux and React Router for ultra fast web apps.</p>
    <Link to="about" className="btn btn-primary btm-lg">
      Learn More
    </Link>
  </div>
)

export default HomePage;