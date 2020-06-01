import React, { FC } from "react";

import { Layout, Radio, Button, Divider } from "../adapters/antd";
import RuleAttributeBox from "./RuleAttributeBox";
import { RadioChangeEvent } from "antd/lib/radio";

interface IProps {
  readOnly?: boolean;
  baseOperator: string;
  setBaseOperator?: (operator: string) => void;
  updateShowSecondary?: (showSecondary: boolean) => void;
  showSecondary?: boolean;
}

const SecondaryBox: FC<IProps> = ({
  readOnly,
  baseOperator,
  setBaseOperator,
  updateShowSecondary,
  showSecondary
}) => {
  const handleConditionChange = (e: RadioChangeEvent) => {
    setBaseOperator && setBaseOperator(e.target.value);
  };

  return (
    <Layout className="rule-box">
      <Divider orientation="left">Secondary Condition</Divider>
      <Radio.Group
        value={baseOperator}
        className="dashed-buttons"
        onChange={handleConditionChange}
        disabled={readOnly}
      >
        <Radio.Button value="and">AND</Radio.Button>
        <Radio.Button value="or">OR</Radio.Button>
      </Radio.Group>

      <RuleAttributeBox type="secondary" readOnly={readOnly} />

      {!readOnly && (
        <Button
          type="dashed"
          className="dashed-buttons"
          onClick={() => {
            updateShowSecondary && updateShowSecondary(!showSecondary);
          }}
        >
          Delete Secondary Condition
        </Button>
      )}
    </Layout>
  );
};

export default SecondaryBox;
