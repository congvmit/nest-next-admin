"use client";

import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Col, Divider, Form, Input, Row } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
  };

  const router = useRouter();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values: any) => {
    const { email, password } = values;
    const result = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/dashboard",
      email,
      password,
    });
    console.log(">> go here");

    if (result?.code === "invalid_credentials") {
      toast.error("Email or password is incorrect!");
    }
    else if (result?.code === "inactive_account") {
      toast.error("Account is inactive!");
    }
    else {
      toast.success("Sign In success!");
      router.push("/dashboard");
    }

  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo,
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row justify={"center"} style={{ marginTop: "30px" }}>
      <Col xs={24} md={16} lg={8}>
        <fieldset
          style={{
            padding: "15px",
            margin: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <legend style={{ fontSize: "24px", fontWeight: "bold" }}>
            Sign In
          </legend>
          <Form
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Email"
              name="email"
              // add default value for testing
              initialValue={"hello-world1@example.com"}
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "The email is not valid!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              initialValue={"12345"}
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType> name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Sign In
              </Button>
            </Form.Item>
          </Form>
          <Link href={"/"}>
            <ArrowLeftOutlined /> Back to home
          </Link>
          <Divider />
          <div style={{ textAlign: "center" }}>
            Do not have an account?{" "}
            <Link href={"/auth/register"}>Sign Up here!</Link>
          </div>
        </fieldset>
      </Col>
    </Row>
  );
};

export default SignInForm;
