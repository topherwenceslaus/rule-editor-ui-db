import React, { FC } from "react";
import { Alert } from "../adapters/antd";

interface IProps {
  errorMessage: string;
}

const ErrorBox: FC<IProps> = ({ errorMessage }) => {
  return (
    <Alert message="Error occured" description={errorMessage} type="error" />
  );
};

export default ErrorBox;
