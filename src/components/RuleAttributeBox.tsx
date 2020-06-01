import React, { ReactElement, FC } from "react";

import { Form, Input, Select, Option } from "../adapters/antd";
import { conditions } from "../constants/RuleConditions";

interface IProps {
  type: string;
  readOnly?: boolean;
}

const RuleAttributeBox: FC<IProps> = ({ type, readOnly }) => {
  const createOptions = (options: string[]) => {
    const results: ReactElement[] = [];
    options.forEach((option, index) => {
      results.push(
        <Option key={index} value={option} selected={index === 0}>
          {option}
        </Option>
      );
    });

    return results;
  };

  return (
    <Form.Item className="form-box">
      <Form.Item
        name={`${type}Name`}
        rules={[{ required: true, message: "Please input rule condition!" }]}
        className="input-box"
      >
        <Input placeholder="Rule" disabled={readOnly} />
      </Form.Item>

      <Form.Item name={`${type}Condition`} className="input-box">
        <Select disabled={readOnly}>{createOptions(conditions)}</Select>
      </Form.Item>

      <Form.Item
        name={`${type}AttributeValue`}
        rules={[{ required: true, message: "Please input rule attributes!" }]}
        className="input-box"
      >
        <Input placeholder="Attributes" disabled={readOnly} />
      </Form.Item>
    </Form.Item>
  );
};

export default RuleAttributeBox;
