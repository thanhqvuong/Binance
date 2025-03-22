import React, { useState } from "react";
import { Form, Input, Button, message, Progress } from "antd"; // Import các thành phần từ Ant Design
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik"; // Import Formik để quản lý form
import * as Yup from "yup"; // Import Yup để xác thực dữ liệu đầu vào
import "./ForgotPassword.css"; // Import file CSS để tạo kiểu

// URL API giả lập dùng để cập nhật mật khẩu
const API_URL = "https://mindx-mockup-server.vercel.app/api/resources/users?apiKey=67c862208a17675d3d3d9313";

const ForgotPasswordForm = () => {
  // State để quản lý tiến trình tải khi gửi yêu cầu
  const [loading, setLoading] = useState(0);

  // Xác thực mật khẩu bằng Yup
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(5, "Mật khẩu phải có ít nhất 5 ký tự") // Mật khẩu tối thiểu 5 ký tự
      .max(32, "Mật khẩu không được quá 32 ký tự") // Mật khẩu tối đa 32 ký tự
      .matches(/[A-Z]/, "Mật khẩu phải chứa ít nhất 1 chữ in hoa") // Phải có ít nhất 1 chữ in hoa
      .matches(/\d/, "Mật khẩu phải chứa ít nhất 1 chữ số") // Phải có ít nhất 1 chữ số
      .matches(/[^\w\s;]/, "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt (trừ dấu `;`)") // Ký tự đặc biệt (trừ dấu `;`)
      .test("no-semicolon", "Mật khẩu không được chứa dấu `;`", (value) => !value.includes(";")) // Không được chứa dấu `;`
      .required("Vui lòng nhập mật khẩu"), // Bắt buộc nhập mật khẩu
  });

  // Xử lý khi người dùng nhấn "Đặt lại mật khẩu"
  const handleSubmit = async (values) => {
    setLoading(0); // Đặt tiến trình tải về 0

    // Giả lập tiến trình tải (hiển thị thanh tiến trình loading)
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 100)); // Delay 100ms
      setLoading(i); // Cập nhật tiến trình loading
    }

    try {
      // Gửi yêu cầu cập nhật mật khẩu lên API
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: values.password }),
      });

      // Kiểm tra nếu có lỗi
      if (!response.ok) throw new Error("Lỗi khi đặt lại mật khẩu");

      message.success("Mật khẩu đã được đặt lại thành công!"); // Hiển thị thông báo thành công
    } catch (error) {
      message.error(error.message); // Hiển thị thông báo lỗi
    } finally {
      setLoading(0); // Reset tiến trình tải
    }
  };

  return (
    <Formik
      initialValues={{ password: "" }} // Giá trị mặc định ban đầu
      validationSchema={validationSchema} // Áp dụng schema xác thực
      onSubmit={handleSubmit} // Gọi hàm xử lý khi submit form
    >
      {({ handleSubmit }) => (
        <FormikForm onSubmit={handleSubmit} className="forgot-password-form">
          {/* Trường nhập mật khẩu */}
          <Form.Item label="Mật khẩu mới">
            <Field name="password" as={Input.Password} /> {/* Input mật khẩu */}
            <ErrorMessage name="password" component="div" className="error-message" /> {/* Hiển thị lỗi */}
          </Form.Item>

          {/* Thanh tiến trình loading */}
          {loading > 0 && <Progress percent={loading} />}

          {/* Nút đặt lại mật khẩu */}
          <Button type="primary" htmlType="submit" disabled={loading > 0}>
            Đặt lại mật khẩu
          </Button>
        </FormikForm>
      )}
    </Formik>
  );
};

export default ForgotPasswordForm;
