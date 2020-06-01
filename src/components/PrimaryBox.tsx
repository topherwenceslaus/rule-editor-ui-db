import React, { FC } from "react";
import RuleAttributeBox from "./RuleAttributeBox";
import { Divider } from "../adapters/antd";

interface IProps {
  readOnly?: boolean;
}
const PrimaryBox: FC<IProps> = ({ readOnly = false }) => {
  return (
    <>
      <Divider orientation="left">Primary Condition</Divider>
      <RuleAttributeBox type="primary" readOnly={readOnly} />
    </>
  );
};

export default PrimaryBox;
