import React, { useState, useEffect } from "react";
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
                const phoneRegex = /^[0-9]{10}$/; // SĐT 10 số
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email hợp lệ
                return phoneRegex.test(value) || emailRegex.test(value);
            })
            .trim(), // Loại bỏ khoảng trắng đầu/cuối
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

        let progressInterval = setInterval(() => {
            setProgress((prev) => (prev < 90 ? prev + 10 : prev));
        }, 200);

        try {
            // 🔥 Gọi API lấy danh sách user
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error("Không thể kết nối đến server!");

            const data = await response.json();
            const rawData = data?.data?.data || [];

            // ✅ Kiểm tra dữ liệu API
            if (!Array.isArray(rawData)) throw new Error("Dữ liệu API không hợp lệ");

            // ✅ Lấy danh sách user
            const allUsers = rawData.flatMap(item => item?.users || item);

            // ✅ Kiểm tra username (email/SĐT) và mật khẩu
            const user = allUsers.find(
                (u) => (u.email === values.username || u.phone === values.username) && u.password === values.password
            );

            setProgress(100);
            setTimeout(() => {
                clearInterval(progressInterval);
                setLoading(false);

                if (user) {
                    if (values.rememberMe) {
                        localStorage.setItem("user", JSON.stringify(user)); // 🔥 Lưu vào localStorage nếu nhớ đăng nhập
                    } else {
                        sessionStorage.setItem("user", JSON.stringify(user)); // 🔥 Lưu vào sessionStorage nếu không nhớ đăng nhập
                    }
                    navigate("/profile");
                } else {
                    setErrors({ password: "Tên đăng nhập hoặc mật khẩu không đúng" });
                }
            }, 500);
        } catch (error) {
            console.error("❌ Lỗi:", error);
            setErrors({ password: "Lỗi hệ thống, vui lòng thử lại sau!" });
            setLoading(false);
            clearInterval(progressInterval);
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
