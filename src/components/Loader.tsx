import React from "react";
import { Spin, Alert } from "../adapters/antd";

const Loader = () => {
  return (
    <Spin tip="Loading...">
      <Alert
        message="Please wait"
        description="Request is in progress"
        type="info"
      />
    </Spin>
  );
};

export default Loader;
