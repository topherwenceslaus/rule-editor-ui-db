import React, { useState, useRef, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import { Layout } from "../adapters/antd";
import { UPDATE_RULE, FETCH_RULES } from "../types/actionTypes";
import { Condition, SecondaryCondition, Rule } from "../types/ruleTypes";
import RuleBox from "./RuleBox";
import { AppContext } from "../AppState";
import Header from "./Header";
import PageNotFound from "./404";
import { fetchAPI } from "../utils/fetch";
import { endPoint } from "../constants/API";
import { HTTPMethods } from "../constants/HTTPMethods";
import Loader from "./Loader";

const UpdateRule = () => {
  const { appState, appDispatch } = useContext(AppContext);
  const historyParams: any = useParams();
  const history = useHistory();

  const ruleData =
    appState.rules.find((rule: Rule) => rule.id === historyParams.ruleid) || [];

  const [showSecondary, setShowSecondary] = useState(
    ruleData?.secondary?.length
  );
  const [baseOperator, setBaseOperator] = useState(
    (ruleData?.secondary && ruleData?.secondary[0]?.baseOperator) || "and"
  );

  const formRef = useRef();

  if (!ruleData || ruleData.length === 0) {
    return <PageNotFound />;
  }

  const { id, name, primary, secondary, priority } = ruleData;

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

  const initialValues = {
    name,
    priority,
    ...primaryObject,
    ...secondaryObject,
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

    const primaryObject: Condition = {
      ...ruleData.primary[0],
      name: primaryName,
      operator: primaryCondition,
      value: primaryAttributeValue,
      dataType: typeof primaryAttributeValue,
    };

    const secondaryObject: SecondaryCondition = {
      ...ruleData.secondary,
      name: secondaryName,
      operator: secondaryCondition,
      value: secondaryAttributeValue,
      dataType: typeof secondaryAttributeValue,
      baseOperator,
    };

    const secondary = secondaryName ? [secondaryObject] : [];

    const rule: Rule = {
      ...ruleData,
      name,
      priority,
      modifiedAt: new Date().toDateString(),
      primary: [{ ...primaryObject }],
      secondary,
    };

    appDispatch({
      type: FETCH_RULES,
    });

    //Mocking server response since there is no actual PUT operation in server
    const url = endPoint + "b9386d04-d69c-4f6a-b4a3-c211febda785";
    const data = await fetchAPI(url, HTTPMethods.PUT);

    appDispatch({
      type: UPDATE_RULE,
      id: ruleData.id,
      rule,
    });

    history.push("/");
  };

  const cancelUpdate = () => {
    history.push("/");
  };

  if (appState.isLoading) {
    return <Loader />;
  }

  return (
    <Layout className="rule-box">
      <Header
        title="Update Rule"
        subTitle="Please fill in all required fields"
      />
      <RuleBox
        formRef={formRef}
        baseOperator={baseOperator}
        setBaseOperator={setBaseOperator}
        onSave={onSave}
        resetForm={cancelUpdate}
        showSecondary={showSecondary}
        updateShowSecondary={updateShowSecondary}
        initialValues={initialValues}
        resetButtonText="Cancel"
      />
    </Layout>
  );
};

export default UpdateRule;
