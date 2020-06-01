import React, { useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

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
import { AppContext } from "../AppState";
import Header from "./Header";
import { Rule } from "../types/ruleTypes";
import PageNotFound from "./404";

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

const ViewRule = () => {
  const { appState } = useContext(AppContext);
  const historyParams: any = useParams();
  const history = useHistory();
  const ruleData =
    appState.rules.find((rule: Rule) => rule.id === historyParams.ruleid) || [];

  if (!ruleData || ruleData.length === 0) {
    return <PageNotFound />;
  }

  const { id, name, primary, secondary, priority } = ruleData;
  const readOnly = true;

  const primaryObject = {
    primaryName: primary[0].name,
    primaryCondition: primary[0].operator,
    primaryAttributeValue: primary[0].value,
  };
  let secondaryObject = null;
  if (secondary.length > 0) {
    secondaryObject = {
      secondaryName: secondary[0].name,
      secondaryCondition: secondary[0].operator,
      secondaryAttributeValue: secondary[0].value,
      baseOperator: secondary[0].baseOperator,
    };
  }

  const editRule = (id: string) => {
    history.push(`/update/${id}`);
  };

  return (
    <Content className="site-layout">
      <Header title="View Rule" subTitle="Read only mode" />
      <Form
        {...layout}
        initialValues={{ name, priority, ...primaryObject, ...secondaryObject }}
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

          {secondaryObject && (
            <SecondaryBox
              baseOperator={secondaryObject.baseOperator}
              readOnly={readOnly}
            />
          )}
        </Layout>

        <Divider dashed orientation="center" />
        <Form.Item {...tailLayout} className="form-buttons">
          <Button
            type="primary"
            onClick={() => {
              editRule(id);
            }}
          >
            Edit
          </Button>
          <Button
            type="primary"
            onClick={() => {
              history.push("/");
            }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};

export default ViewRule;
