import React, { FC } from "react";

import {
  Layout,
  Button,
  Radio,
  Input,
  Form,
  Divider,
  Content,
} from "../adapters/antd";
import PrimaryBox from "./PrimaryBox";
import SecondaryBox from "./SecondaryBox";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

interface IProps {
  readOnly?: boolean;
  baseOperator: string;
  formRef: any;
  onSave: (values: any) => void;
  resetForm: () => void;
  initialValues: {};
  showSecondary: boolean;
  updateShowSecondary: (showSecondary: boolean) => void;
  submitButtonText?: string;
  resetButtonText?: string;
  setBaseOperator?: (opertor: string) => void;
}

const RuleBox: FC<IProps> = ({
  readOnly = false,
  baseOperator,
  formRef,
  onSave,
  resetForm,
  setBaseOperator,
  initialValues,
  showSecondary,
  updateShowSecondary,
  submitButtonText = "Save",
  resetButtonText = "Reset",
}) => {
  return (
    <>
      <Content className="site-layout">
        <Form
          {...layout}
          ref={formRef}
          name="rule-add"
          onFinish={onSave}
          initialValues={initialValues}
        >
          <Form.Item
            name="name"
            label="Rule Name"
            rules={[{ required: true, message: "Please input name!" }]}
          >
            <Input disabled={readOnly} />
          </Form.Item>
          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true }]}
          >
            <Radio.Group disabled={readOnly}>
              <Radio value="high">High</Radio>
              <Radio value="medium">Medium</Radio>
              <Radio value="low">Low</Radio>
            </Radio.Group>
          </Form.Item>
          <Divider dashed orientation="center" />
          <Layout className="rule-box">
            <PrimaryBox readOnly={readOnly} />
            {showSecondary ? (
              <SecondaryBox
                baseOperator={baseOperator}
                setBaseOperator={setBaseOperator}
                readOnly={readOnly}
                showSecondary={showSecondary}
                updateShowSecondary={updateShowSecondary}
              />
            ) : (
              !readOnly && (
                <Button
                  type="dashed"
                  className="dashed-buttons"
                  onClick={() => {
                    updateShowSecondary(!showSecondary);
                  }}
                >
                  Add Secondary Condition
                </Button>
              )
            )}
          </Layout>

          <Divider dashed orientation="center" />
          {!readOnly && (
            <Form.Item {...tailLayout} className="form-buttons">
              <Button type="primary" htmlType="submit">
                {submitButtonText}
              </Button>
              <Button htmlType="button" onClick={resetForm}>
                {resetButtonText}
              </Button>
            </Form.Item>
          )}
        </Form>
      </Content>
    </>
  );
};

export default RuleBox;
