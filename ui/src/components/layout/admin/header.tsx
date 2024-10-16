"use client";

import { AdminContext } from "@/providers/admin.provider";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import { useContext } from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { signOut, useSession } from "next-auth/react";

const AdminHeader = (props: any) => {
  const { Header } = Layout;
  const { collapseMenu, setCollapseMenu } = useContext(AdminContext)!;
  const { session } = props;
  // const { data: session, status } = useSession();
  // console.log('session', session)

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/auth/signin" });
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <span>Settings</span>,
    },
    {
      key: "2",
      label: (
        <span
          onClick={() => {
            handleSignOut();
          }}
        >
          Sign Out
        </span>
      ),
    },
  ];

  return (
    <>
      <Header
        style={{
          padding: 0,
          display: "flex",
          background: "#f5f5f5",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          type="text"
          icon={collapseMenu ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapseMenu(!collapseMenu)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <Dropdown menu={{ items }}>
          <a
            onClick={(e) => e.preventDefault()}
            style={{
              color: "unset",
              lineHeight: "0 !important",
              marginRight: 20,
            }}
          >
            <Space>
              Welcome {session?.user?.name ?? "User"}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </Header>
    </>
  );
};

export default AdminHeader;
