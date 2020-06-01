//@ts-nocheck
// ANTD type issues hence no-check

import React from "react";
import { Link, useLocation } from "react-router-dom";

import {
  Menu,
  OrderedListOutlined,
  PlusCircleOutlined,
  Sider
} from "../adapters/antd";

const MenuBar = () => {
  const location = useLocation();
  const selectedkeys = location.pathname === "/" ? ["1"] : ["2"];

  return (
    <Sider collapsed>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selectedkeys}
        className="menu-icons"
      >
        <Menu.Item key="1" icon={<OrderedListOutlined />}>
          <Link to="/"> Home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<PlusCircleOutlined />}>
          <Link to="/addrule"> Add Rule </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default MenuBar;
