import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Table, Space, Button } from "../adapters/antd";
import { AppContext } from "../AppState";
import { DELETE_RULE } from "../types/actionTypes";
import { Rule } from "../types/ruleTypes";
import Loader from "./Loader";
import ErrorBox from "./ErrorBox";
import { fetchAPI } from "../utils/fetch";
import { endPoint } from "../constants/API";
import { HTTPMethods } from "../constants/HTTPMethods";
import { FETCH_RULES } from "../types/actionTypes";

const Home = () => {
  const { appState, appDispatch } = useContext(AppContext);

  const deleteRule = async (id: string) => {
    appDispatch({
      type: FETCH_RULES,
    });

    //Mocking server response since there is no actual DELETE operation in server
    const url = endPoint + "b9386d04-d69c-4f6a-b4a3-c211febda785";
    const data = await fetchAPI(url, HTTPMethods.DELETE);

    appDispatch({
      type: DELETE_RULE,
      id,
    });
  };

  const columns = [
    {
      title: "Rule Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, rule: Rule) => {
        return <Link to={`rules/${rule.id}`}>{text}</Link>;
      },
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },

    {
      title: "Action",
      key: "action",
      render: (text: string, rule: Rule) => (
        <Space size="middle">
          <Link to={`update/${rule.id}`}>Edit</Link>
          <a
            onClick={() => {
              deleteRule(rule.id);
            }}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];

  if (appState.isLoading) {
    return <Loader />;
  }

  if (appState.isError) {
    return <ErrorBox errorMessage={appState.errorMessage} />;
  }

  return (
    <>
      <Table columns={columns} dataSource={appState.rules} />
      <Button type="link" className="form-buttons">
        <Link to="/addrule">Add New Rule</Link>
      </Button>
    </>
  );
};

export default Home;
