import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../store/Theme"; // Import custom hook để quản lý theme (Light/Dark mode)
import "./Header.css"; // Import file CSS cho Header

const Header = () => {
  const navigate = useNavigate(); // Hook điều hướng trang
  const { theme, toggleTheme } = useTheme(); // Lấy trạng thái theme và hàm toggle từ context

  // ✅ State để kiểm soát hiển thị header khi cuộn trang
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);

  // ✅ State để lưu thông tin user (nếu đã đăng nhập)
  const [user, setUser] = useState(null);

  // ✅ State để điều khiển hiển thị dropdown menu
  const [showDropdown, setShowDropdown] = useState(false);

  // ✅ Lấy thông tin user từ sessionStorage hoặc localStorage khi component mount
  useEffect(() => {
    const savedUser = sessionStorage.getItem("user") || localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Parse dữ liệu từ JSON string thành object
    }
  }, []);

  // ✅ Xử lý ẩn/hiện header khi cuộn trang
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10); // Ẩn nếu cuộn xuống, hiện nếu cuộn lên
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll); // Lắng nghe sự kiện cuộn trang
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup khi unmount
  }, [prevScrollPos]);

  // ✅ Xử lý đăng xuất
  const handleLogout = () => {
    // Lưu lại lịch sử đăng nhập trong localStorage hoặc sessionStorage
    const loginHistory = JSON.parse(localStorage.getItem("loginHistory")) || [];

    // Thêm thông tin đăng xuất vào lịch sử (có thể là thời gian và tên người dùng)
    const logoutInfo = {
      username: user.username, // Thêm username vào lịch sử
      time: new Date().toISOString(), // Lưu thời gian đăng xuất
      action: "logout", // Đánh dấu hành động là "logout"
    };

    loginHistory.push(logoutInfo);
    localStorage.setItem("loginHistory", JSON.stringify(loginHistory)); // Lưu lại vào localStorage

    // Xóa user khỏi state
    setUser(null); 
    sessionStorage.removeItem("user"); // Xóa thông tin user trong sessionStorage
    localStorage.removeItem("user"); // Xóa thông tin user trong localStorage

    // Điều hướng về trang đăng nhập
    navigate("/login");
  };

  return (
    <header className={`header ${visible ? "" : "hidden-header"}`}>
      <div className="header-container">
        {/* 🔥 Logo */}
        <Link to="/" className="logo">Binance</Link>

        {/* 🔥 Navbar */}
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item"><Link to="/buycrypto">Mua Crypto</Link></li>
            <li className="nav-item"><Link to="/market">Thị trường</Link></li>
            <li className="nav-item"><Link to="/trading">Giao dịch</Link></li>
            <li className="nav-item"><Link to="/future">Futures</Link></li>
            <li className="nav-item"><Link to="/earning">Earn</Link></li>
          </ul>
        </nav>

        {/* 🔥 Phần bên phải */}
        <div className="header-right">
          {/* 🔍 Ô tìm kiếm */}
          <input type="text" className="search-input" placeholder="🔍 Tìm kiếm..." />

          {/* ✅ Nếu đã đăng nhập thì hiển thị avatar hoặc username */}
          {user ? (
            <div className="user-section">
              {/* 🔥 Khu vực user info (bấm để mở dropdown) */}
              <div className="user-info" onClick={() => setShowDropdown(!showDropdown)}>
                {user.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="user-avatar" />
                ) : (
                  <span className="user-name">{user.username}</span>
                )}
              </div>

              {/* 🔥 Dropdown menu (chỉ hiển thị khi click vào user) */}
              {showDropdown && (
                <div className="dropdown-menu">
                  <Link to="/profile">Hồ sơ</Link>
                  <button onClick={handleLogout}>Đăng xuất</button>
                </div>
              )}
            </div>
          ) : (
            // ✅ Nếu chưa đăng nhập thì hiển thị 2 button "Đăng nhập" & "Đăng ký"
            <>
              <Link to="/login"><button className="login-btn">Đăng nhập</button></Link>
              <Link to="/register"><button className="register-btn">Đăng ký</button></Link>
            </>
          )}

          {/* 🔥 Nút chuyển đổi chế độ Light/Dark Mode */}
          <div onClick={toggleTheme} className="theme-toggle-icon">
            {theme === "light" ? "☀️" : "🌙"}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
