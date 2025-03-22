import "./BlogP2P.css";

const BlogP2P = () => {
  return (
    <div className="blog-container">
      <h1>Blog P2P</h1>
      <div className="blog-grid">
        <div className="blog-card">
          <h2>Rủi ro tiềm ẩn đằng sau những giao dịch P2P ngoài sàn</h2>
          <p>
            Giao dịch P2P ngoài sàn giao dịch mặc dù mang lại một số lợi ích tiềm
            năng nhưng cũng đi kèm với rủi ro lừa đảo và gian lận đáng kể.
          </p>
        </div>
        <div className="blog-card">
          <h2>Giữ an toàn với P2P: Cách nhận biết và phòng tránh mánh scam đã thanh toán nhưng hủy lệnh</h2>
          <p>
            Trò lừa đảo đã thanh toán nhưng hủy lệnh P2P là hình thức lừa đảo trong đó tội phạm đóng giả là
            người bán tiền mã hoá để lừa người mua.
          </p>
        </div>
        <div className="blog-card promo">
          <h2>Mua Crypto Lần Đầu Trên Binance P2P</h2>
          <p>
            Tặng 300.000đ khi mua crypto lần đầu trên Binance P2P. Hoàn thành nạp mua tối thiểu 50 USDT.
          </p>
          <span className="date">2024-02-26</span>
        </div>
      </div>
    </div>
  );
};

export default BlogP2P;
