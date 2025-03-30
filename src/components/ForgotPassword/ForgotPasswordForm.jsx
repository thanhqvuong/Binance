import React, { useState } from "react";
import { Form, Input, Button, message, Skeleton } from "antd";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

const API_URL = "https://mindx-mockup-server.vercel.app/api/resources/users?apiKey=67c862208a17675d3d3d9313";

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const validationSchemaStep1 = Yup.object().shape({
    identifier: Yup.string().required("Vui lòng nhập email hoặc số điện thoại"),
  });

  const validationSchemaStep2 = Yup.object().shape({
    password: Yup.string()
      .min(5, "Mật khẩu phải có ít nhất 5 ký tự")
      .max(32, "Mật khẩu không được quá 32 ký tự")
      .matches(/[A-Z]/, "Mật khẩu phải chứa ít nhất 1 chữ in hoa")
      .matches(/\d/, "Mật khẩu phải chứa ít nhất 1 chữ số")
      .matches(/[^\w\s;]/, "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt (trừ dấu `;`)")
      .test("no-semicolon", "Mật khẩu không được chứa dấu `;`", (value) => !value.includes(";"))
      .required("Vui lòng nhập mật khẩu mới"),
  });

  const handleCheckAccount = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!data || !data.data || !data.data.data) {
        throw new Error("⚠️ Lỗi khi lấy dữ liệu từ API!");
      }

      const user = data.data.data.find(
        (u) => u.email === values.identifier || u.phone === values.identifier
      );

      if (!user) {
        // Nếu không tìm thấy tài khoản, hiển thị thông báo lỗi và không chuyển sang bước 2
        message.error("❌ Tài khoản không tồn tại!");  // Hiển thị thông báo lỗi
        setStep(1); // Giữ lại ở bước 1, không chuyển sang bước 2
      } else {
        setUserData(user);
        setStep(2); // Nếu tìm thấy tài khoản, chuyển qua bước 2
      }
    } catch (error) {
      // Nếu có lỗi xảy ra, hiển thị thông báo lỗi và giữ lại ở bước 1
      message.error(error.message || "⚠️ Lỗi khi kiểm tra tài khoản!");  // Hiển thị thông báo lỗi
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (values) => {
    setLoading(true);
    try {
      // Gửi POST để tạo user mới với mật khẩu mới
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userData.username, // Giữ nguyên username
          email: userData.email,       // Giữ nguyên email
          phone: userData.phone,       // Giữ nguyên phone
          password: values.password,   // Cập nhật mật khẩu mới
        }),
      });

      if (!response.ok) throw new Error("⚠️ Lỗi khi đặt lại mật khẩu");

      // Bước 3: Nếu tạo user mới thành công, chuyển hướng đến trang login
      message.success("✅ Mật khẩu đã được đặt lại thành công!");
      navigate("/login");
    } catch (error) {
      message.error(error.message);  // Hiển thị thông báo lỗi
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      {step === 1 ? (
        <Formik initialValues={{ identifier: "" }} validationSchema={validationSchemaStep1} onSubmit={handleCheckAccount}>
          {({ handleSubmit }) => (
            <FormikForm onSubmit={handleSubmit} className="forgot-password-form">
              <Form.Item label="Email hoặc Số điện thoại">
                <Field name="identifier" as={Input} />
                <ErrorMessage name="identifier" component="div" className="error-message" />
              </Form.Item>

              {loading ? <Skeleton.Button active size="large" block /> : (
                <Button type="primary" htmlType="submit">Kiểm tra tài khoản</Button>
              )}
            </FormikForm>
          )}
        </Formik>
      ) : (
        <Formik initialValues={{ password: "" }} validationSchema={validationSchemaStep2} onSubmit={handleResetPassword}>
          {({ handleSubmit }) => (
            <FormikForm onSubmit={handleSubmit} className="forgot-password-form">
              <Form.Item label="Mật khẩu mới">
                <Field name="password" as={Input.Password} />
                <ErrorMessage name="password" component="div" className="error-message" />
              </Form.Item>

              {loading ? <Skeleton.Button active size="large" block /> : (
                <Button type="primary" htmlType="submit">Đặt lại mật khẩu</Button>
              )}
            </FormikForm>
          )}
        </Formik>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
