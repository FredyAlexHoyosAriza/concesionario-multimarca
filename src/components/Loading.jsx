import React from "react";
import ReactLoading from "react-loading";

const Loading = ({ type, color }) => (
  <ReactLoading type={type} color={color} height={"20%"} width={"20%"} /> // type={'spin'}
);

export default Loading;
