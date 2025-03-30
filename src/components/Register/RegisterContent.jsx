import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Button, message, Alert, Progress } from "antd";
import { useNavigate } from "react-router-dom";
import "./RegisterContent.css";

const API_URL = "https://mindx-mockup-server.vercel.app/api/resources/users?apiKey=67c862208a17675d3d3d9313";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Vui lòng nhập tên tài khoản"),
  phone: Yup.string().matches(/^\d{10,11}$/, "Số điện thoại không hợp lệ").required("Vui lòng nhập số điện thoại"),
  email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
  password: Yup.string()
    .min(5, "Mật khẩu phải từ 5 - 32 ký tự")
    .max(32, "Mật khẩu phải từ 5 - 32 ký tự")
    .matches(/[A-Z]/, "Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa")
    .matches(/[0-9]/, "Mật khẩu phải chứa ít nhất 1 số")
    .matches(/[!@#$%^&*]/, "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt (!@#$%^&*)")
    .test("no-semicolon", "Mật khẩu không được chứa dấu `;`", (value) => !value.includes(";"))
    .required("Vui lòng nhập mật khẩu"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Mật khẩu nhập lại không khớp").required("Vui lòng nhập lại mật khẩu"),
});

const RegisterContent = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Lỗi khi lấy dữ liệu");

        const data = await res.json();
        if (!data?.data?.data) throw new Error("Dữ liệu API không hợp lệ");

        const rawData = data.data.data;
        const usersFromList = rawData.flatMap((item) => item?.users || []);
        const individualUsers = rawData.filter((item) => !item?.users).map(({ _id, ...user }) => user);

        setUsers([...usersFromList, ...individualUsers]);
      } catch (error) {
        console.error("❌ Lỗi khi lấy users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleRegister = async (values, { setErrors, resetForm }) => {
    setLoading(true);
    setProgress(10);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const existingUser = users.find(
      (user) => user.username === values.username || user.email === values.email || user.phone === values.phone
    );

    if (existingUser) {
      setErrors({
        username: existingUser.username === values.username ? "Tên tài khoản đã tồn tại" : undefined,
        email: existingUser.email === values.email ? "Email đã được sử dụng" : undefined,
        phone: existingUser.phone === values.phone ? "Số điện thoại đã được đăng ký" : undefined,
      });
      setProgress(0);
      setLoading(false);
      return;
    }

    setProgress(50);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          phone: values.phone,
          password: values.password,
        }),
      });

      if (!response.ok) throw new Error("Lỗi khi đăng ký");

      setProgress(100);
      message.success("Đăng ký thành công! Chuyển đến trang đăng nhập...");
      setUsers((prev) => [...prev, values]);

      resetForm();
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      message.error("Lỗi đăng ký. Vui lòng thử lại!");
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h1>Đăng Ký</h1>
      {progress > 0 && <Progress percent={progress} status={progress === 100 ? "success" : "active"} />}

      <Formik
        initialValues={{ username: "", phone: "", email: "", password: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({ errors, touched }) => (
          <Form className="register-form">
            <Field name="username" as={Input} placeholder="Tên tài khoản" />
            {errors.username && touched.username && <Alert message={errors.username} type="error" showIcon />}

            <Field name="phone" as={Input} placeholder="Số điện thoại" />
            {errors.phone && touched.phone && <Alert message={errors.phone} type="error" showIcon />}

            <Field name="email" as={Input} placeholder="Email" />
            {errors.email && touched.email && <Alert message={errors.email} type="error" showIcon />}

            <Field name="password" as={Input.Password} placeholder="Mật khẩu" />
            {errors.password && touched.password && <Alert message={errors.password} type="error" showIcon />}

            <Field name="confirmPassword" as={Input.Password} placeholder="Nhập lại mật khẩu" />
            {errors.confirmPassword && touched.confirmPassword && <Alert message={errors.confirmPassword} type="error" showIcon />}

            <Button type="primary" htmlType="submit" block disabled={loading}>
              {loading ? "Đang đăng ký..." : "Đăng Ký"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterContent;
