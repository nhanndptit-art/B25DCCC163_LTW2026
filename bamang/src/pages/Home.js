import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ playerName, onChangeName }) => {
  const navigate = useNavigate();

  const handleStart = (e) => {
    e.preventDefault();
    if (!playerName.trim()) {
      return;
    }
    navigate('/play');
  };

  return (
    <div className="page-card home-card">
      <h1>Thử thách 3 mạng</h1>

      <div className="rules-box">
        <h3>Luật chơi:</h3>
        <ul>
          <li>Bạn có <strong>3 mạng</strong> và <strong>90 giây</strong> cho cả lượt chơi gồm <strong>15 câu hỏi</strong>.</li>
          <li>Trả lời đúng được cộng điểm theo mức độ: Dễ (100 điểm), Trung bình (200 điểm), Khó (300 điểm).</li>
          <li>Từ câu đúng thứ 3 liên tiếp trở đi, mỗi câu đúng được thưởng thêm <strong>50 điểm</strong>.</li>
          <li>Trả lời sai bị trừ 1 mạng, chuỗi đúng về 0 nhưng vẫn đi tiếp.</li>
          <li>Lượt chơi kết thúc khi trả lời xong 15 câu, hết mạng hoặc hết giờ.</li>
        </ul>
      </div>

      <form onSubmit={handleStart} className="start-form">
        <label htmlFor="playerNameInput">Tên người chơi:</label>
        <input
          id="playerNameInput"
          type="text"
          placeholder="Nhập tên của bạn..."
          value={playerName}
          onChange={(e) => onChangeName(e.target.value)}
          className="name-input"
        />
        <button
          type="submit"
          className="primary-btn"
          disabled={!playerName.trim()}
        >
          Bắt đầu
        </button>
      </form>
    </div>
  );
};

export default Home;