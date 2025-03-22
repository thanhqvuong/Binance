import React from "react";
import { Link } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import "./SubHeader.css";

const SubHeader = () => {
  return (
    <nav className="sub-header">
      <ul>
        <li>
          <Link to="/buycrypto">
            Mua và bán
          </Link>
        </li>
        <li>
          <Link to="/buyperiodically">Mua định kỳ</Link>
        </li>
        <li>
          <Link to="/recharge">Nạp</Link>
        </li>
        <li>
          <Link to="/withdraw">Rút</Link>
        </li>
      </ul>

      <div className="sub-header-right">
        <Link to="/orders" className="icon-link">
          <FaClipboardList size={16} /> Lệnh
        </Link>
        <Link to="/faq" className="icon-link">
          <FaQuestionCircle size={16} /> Câu hỏi thường gặp
        </Link>
      </div>
    </nav>
  );
};

export default SubHeader;
