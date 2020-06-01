import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { Layout, Content } from "../adapters/antd";
import MenuBar from "./MenuBar";
import Home from "./Home";
import PageNotFound from "./404";
import ViewRule from "./ViewRule";
import UpdateRule from "./UpdateRule";
import AddRule from "./AddRule";

export default function App() {
  return (
    <Layout className="site-layout">
      <MenuBar />
      <Content className="content-layout">
        <h1>Rule Editor</h1>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/rules/:ruleid" component={ViewRule} />
          <Route path="/update/:ruleid" component={UpdateRule} />
          <Route exact path="/addrule" component={AddRule} />
          <Route exact path="/404" component={PageNotFound} />
          <Route component={PageNotFound} />
        </Switch>
      </Content>
    </Layout>
  );
}
