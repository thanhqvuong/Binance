import React from "react";
import "./FAQSection.css";

const guides = [
    "Cách phát triển danh mục đầu tư tiền mã hóa của bạn bằng tính năng mua định kỳ",
    "Đầu tư tiền mã hóa định kỳ: Lợi ích và cách bắt đầu",
    "Cách sử dụng Mua định kỳ"
];

const faqItems = [
    "Giới thiệu về Mua định kỳ và các câu hỏi thường gặp",
    "Cách sử dụng Mua định kỳ",
    "Cách phát triển danh mục đầu tư tiền mã hóa của bạn bằng tính năng mua định kỳ"
];

const FAQSection = () => {
    return (
        <section className="faq-section">
            <h2>Hướng dẫn và tài nguyên</h2>
            <ul className="guide-list">
                {guides.map((guide, index) => (
                    <li key={index} className="guide-item">
                        {guide}
                    </li>
                ))}
            </ul>

            <h3>Câu hỏi thường gặp</h3>
            <ul className="faq-list">
                {faqItems.map((item, index) => (
                    <li key={index} className="faq-item">
                        {item}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default FAQSection;
