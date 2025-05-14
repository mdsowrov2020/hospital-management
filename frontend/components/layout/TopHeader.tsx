import React, { useEffect, useState } from "react";
import { Layout, Dropdown, Avatar, Menu, theme, Spin } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { getProfile } from "@/lib/api/profile/service";
import { useAuth } from "@/context/AuthProvider";
import CustomBreadCrumb from "../ui/CustomBreadCrumb";
import { useRouter } from "next/router";
import UserMenu from "../common/UserMenu";

const { Header } = Layout;

const TopHeader = () => {
  return (
    <Header
      style={{
        padding: "0 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fff",
        height: "70px",
      }}
    >
      <CustomBreadCrumb />

      <UserMenu />
    </Header>
  );
};

export default TopHeader;
