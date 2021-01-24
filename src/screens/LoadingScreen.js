import React from "react";
import Loader from "react-loader-spinner";
import "./LoadingScreen.css";

const LoadingScreen = () => {
  return (
    <div className="loading">
      <h1 className="blue" style={{ fontSize: "5rem" }}>
        <b>Quiz</b>dom
      </h1>
      {/* <Loader color="#29455a" width={130} height={130}  type="audio" /> */}
      <Loader color="#29455a" width={130} height={130} type="BallTriangle" />
      {/* <Loader color="#29455a" width={130} height={130}  type="Puff" /> */}
      {/* <Loader color="#29455a" width={130} height={130} type="Bars" /> */}
      {/* <Loader color="#29455a" width={130} height={130}  type="Circles" /> */}
    </div>
  );
};
export default LoadingScreen;
