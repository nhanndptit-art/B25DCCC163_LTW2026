import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatScore } from '../data';

const Home = ({ playerName, onChangeName, history }) => {
  const navigate = useNavigate();

  const bestRecord =
    history.length > 0
      ? [...history].sort((a, b) => {
          if (b.score !== a.score) {
            return b.score - a.score;
          }
          return b.livesLeft - a.livesLeft;
        })[0]
      : null;

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
          <li>Bạn có 3 quyền trợ giúp: <strong>50:50</strong>, <strong>Bỏ qua</strong>, <strong>Thêm 1 mạng</strong> (mỗi quyền dùng 1 lần).</li>
          <li>Có thể dùng phím tắt <strong>A, B, C, D</strong> trên bàn phím để chọn đáp án nhanh.</li>
        </ul>
      </div>

      {bestRecord && (
        <div className="record-banner">
          {`Kỷ lục: ${formatScore(bestRecord.score)} – ${bestRecord.name}`}
        </div>
      )}

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