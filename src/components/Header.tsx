import React, { FC } from "react";
import { PageHeader } from "../adapters/antd";

interface IProps {
  title: string;
  subTitle?: string;
}

const Header: FC<IProps> = ({ title, subTitle = "" }) => {
  return (
    <>
      <PageHeader
        className="site-page-header"
        title={title}
        subTitle={subTitle}
      />
    </>
  );
};

export default Header;
