"use client";

import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Col, Divider, Form, Input, Row } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { sendRequest } from "@/utils/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  type FieldType = {
    email?: string;
    password?: string;
    username?: string;
  };
  const router = useRouter();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values: any) => {
    let result;
    try {
      result = await sendRequest<IBackendRes<any>>({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/signup`,
        body: {
          email: values.email,
          password: values.password,
          name: values.username,
        },
      });
    } catch (error) {
      toast.error("Sign up failed. Please try again later.");
      return;
    }
    if (+result.statusCode === 201 || +result.statusCode === 200) {
      toast.success("Sign Up success!");
      router.push("/auth/signin");
    } else {
      toast.error(result?.message || "Internal server error");
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
            Sign Up
          </legend>
          <Form
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Name"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Email"
              name="email"
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
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <Link href={"/"}>
            <ArrowLeftOutlined /> Back to Home Page
          </Link>
          <Divider />
          <div style={{ textAlign: "center" }}>
            Already have an account? <Link href={"/auth/login"}>Sign In</Link>
          </div>
        </fieldset>
      </Col>
    </Row>
  );
};

export default SignUpForm;
