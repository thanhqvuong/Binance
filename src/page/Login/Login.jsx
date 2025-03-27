import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const API_URL = "https://mindx-mockup-server.vercel.app/api/resources/users?apiKey=67c862208a17675d3d3d9313";

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    // ✅ Validation Schema
    const validationSchema = Yup.object({
        username: Yup.string()
            .required("Vui lòng nhập số điện thoại hoặc email")
            .test("is-valid-username", "Số điện thoại hoặc email không hợp lệ", (value) => {
                if (!value) return false;
                const phoneRegex = /^[0-9]{10}$/;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return phoneRegex.test(value) || emailRegex.test(value);
            })
            .trim(),
        password: Yup.string()
            .required("Vui lòng nhập mật khẩu")
            .min(5, "Mật khẩu phải từ 5 - 32 ký tự")
            .max(32, "Mật khẩu phải từ 5 - 32 ký tự")
            .matches(/[A-Z]/, "Mật khẩu phải có ít nhất 1 chữ hoa")
            .matches(/[^A-Za-z0-9;]/, "Mật khẩu phải có ít nhất 1 ký tự đặc biệt")
            .test("no-semicolon", "Mật khẩu không được chứa dấu `;`", (value) => !value.includes(";")),
    });

    // ✅ Xử lý đăng nhập
    const handleSubmit = async (values, { setErrors }) => {
        setLoading(true);
        setProgress(10);

        const simulateProgress = (target) => {
            setTimeout(() => {
                setProgress((prev) => (prev < target ? prev + 10 : prev));
                if (progress < target) simulateProgress(target);
            }, 200);
        };

        simulateProgress(90);

        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error("Không thể kết nối đến server!");

            const data = await response.json();
            let allUsers = [];

            // ✅ Lấy user trong mảng "users"
            if (Array.isArray(data?.data?.data)) {
                allUsers = data.data.data.flatMap((item) => item?.users || []);
            }

            // ✅ Nếu có user riêng lẻ ngoài mảng, thêm vào danh sách
            if (data?.data?.data) {
                data.data.data.forEach((item) => {
                    if (item.username && item.password) {
                        allUsers.push(item);
                    }
                });
            }

            // ✅ Kiểm tra user hợp lệ
            const user = allUsers.find(
                (u) =>
                    (u.email === values.username || u.phone === values.username) &&
                    u.password === values.password
            );

            simulateProgress(100);
            setTimeout(() => {
                if (user) {
                    const storage = values.rememberMe ? localStorage : sessionStorage;
                    storage.setItem("user", JSON.stringify(user));
                    navigate("/profile");
                } else {
                    setErrors({ password: "Tên đăng nhập hoặc mật khẩu không đúng" });
                }
                setLoading(false);
            }, 500);
        } catch (error) {
            console.error("❌ Lỗi:", error);
            setErrors({ password: "Lỗi hệ thống, vui lòng thử lại sau!" });
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            {/* 🔥 Loading Overlay */}
            {loading && (
                <div className="loading-overlay">
                    <div className="loading-box">
                        <p className="loading-text">Đang đăng nhập... {progress}%</p>
                        <div className="loading-bar">
                            <div className="loading-bar-fill" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                </div>
            )}

            {/* 🔥 Giao diện login */}
            <div className="login-left">
                <h1>Binance</h1>
                <p>Bạn có thể đăng nhập ở đây</p>
            </div>

            <div className="login-right">
                <h2>Đăng Nhập</h2>
                <Formik
                    initialValues={{ username: "", password: "", rememberMe: false }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="login-form">
                            <div>
                                <label>Số điện thoại hoặc email</label>
                                <Field type="text" name="username" />
                                <ErrorMessage name="username" component="div" className="error-message" />
                            </div>
                            <div>
                                <label>Mật Khẩu</label>
                                <Field type="password" name="password" />
                                <ErrorMessage name="password" component="div" className="error-message" />
                            </div>

                            {/* 🔥 Remember me & Forgot password */}
                            <div className="login-options">
                                <label>
                                    <Field type="checkbox" name="rememberMe" />
                                    Ghi nhớ đăng nhập
                                </label>
                                <Link to="/forgotpassword">Quên Mật Khẩu?</Link>
                            </div>

                            <button type="submit" disabled={isSubmitting || loading}>
                                {loading ? "🔄 Đang đăng nhập..." : "🚀 Sign In"}
                            </button>
                        </Form>
                    )}
                </Formik>

                {/* 🔥 Register Link */}
                <p className="register-link">
                    <Link to="/register">Đăng Ký Tài Khoản</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
