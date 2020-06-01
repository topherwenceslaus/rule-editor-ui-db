import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <h1>
      Page not found. Go back to <Link to="/">Home</Link>
    </h1>
  );
};

export default PageNotFound;
