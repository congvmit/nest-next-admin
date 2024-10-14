"use client";

import { Footer } from "antd/es/layout/layout";

const AdminFooter = () => {
  return (
    <>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Owlly Design ©{new Date().getFullYear()} Powered by Ant UED
      </Footer>
    </>
  );
};

export default AdminFooter;
