import React, { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

import { Layout } from "../adapters/antd";
import { uuid } from "../adapters/uuid";
import { Condition, SecondaryCondition, Rule } from "../types/ruleTypes";
import RuleBox from "./RuleBox";
import { AppContext } from "../AppState";
import { ADD_RULE, FETCH_RULES } from "../types/actionTypes";
import Header from "./Header";
import { endPoint } from "../constants/API";
import { fetchAPI } from "../utils/fetch";
import { HTTPMethods } from "../constants/HTTPMethods";
import Loader from "./Loader";

const AddRule = () => {
  const { appState, appDispatch } = useContext(AppContext);
  const history = useHistory();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [showSecondary, setShowSecondary] = useState(false);
  const [baseOperator, setBaseOperator] = useState("and");

  const updatebaseOperator = (operator: string): void => {
    setBaseOperator(operator);
  };
  const updateShowSecondary = (showOrHide: boolean) => {
    setShowSecondary(showOrHide);
  };

  const onSave = async (values: { [prop: string]: string }) => {
    const {
      name,
      primaryName,
      priority,
      primaryCondition,
      primaryAttributeValue,
      secondaryName,
      secondaryCondition,
      secondaryAttributeValue,
    } = values;

    const primary: Condition = {
      name: primaryName,
      operator: primaryCondition,
      value: primaryAttributeValue,
      id: uuid(),
      dataType: typeof primaryAttributeValue,
    };

    const secondary: SecondaryCondition = {
      name: secondaryName,
      operator: secondaryCondition,
      value: secondaryAttributeValue,
      id: uuid(),
      dataType: typeof secondaryAttributeValue,
      baseOperator,
    };

    const rule: Rule = {
      key: uuid(),
      id: uuid(),
      priority,
      name,
      createdAt: new Date().toDateString(),
      modifiedAt: new Date().toDateString(),
      primary: [primary],
      secondary: secondaryName ? [secondary] : [],
    };

    appDispatch({
      type: FETCH_RULES,
    });

    //Mocking server response since there is no actual POST operation in server
    const data = await fetchAPI(endPoint, HTTPMethods.POST);

    appDispatch({
      type: ADD_RULE,
      rule,
    });

    history.push("/");
  };

  const resetForm = () => {
    if (formRef && formRef.current) {
      formRef.current.resetFields();
    }
  };

  if (appState.isLoading) {
    return <Loader />;
  }

  return (
    <Layout className="site-layout">
      <Header title="Add Rule" subTitle="Fill in all the required fields" />
      <RuleBox
        formRef={formRef}
        baseOperator={baseOperator}
        setBaseOperator={updatebaseOperator}
        onSave={onSave}
        resetForm={resetForm}
        showSecondary={showSecondary}
        updateShowSecondary={updateShowSecondary}
        initialValues={{
          priority: "high",
          primaryCondition: "GREATER_THAN",
          secondaryCondition: "GREATER_THAN",
        }}
      />
    </Layout>
  );
};

export default AddRule;
