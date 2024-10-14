"use client";

import { Content } from "antd/es/layout/layout";

const AdminContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <Content>
        <div
          style={{
            padding: 24,
            minHeight: "calc(100vh - 180px)",
            // background: "#ccc",
            // borderRadius: "#ccc",
          }}
        >
          {children}
        </div>
      </Content>
    </>
  );
};

export default AdminContent;
