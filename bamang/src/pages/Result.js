import React from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { formatScore } from '../data';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    return <Navigate to="/" replace />;
  }

  const { name, score, correctCount, livesLeft, reason } = location.state;

  const getHeadingMessage = () => {
    if (reason === 'perfect') {
      return 'Xuất sắc! Bạn đã trả lời đúng cả 15 câu';
    }
    if (reason === 'completed') {
      return 'Bạn đã hoàn thành thử thách';
    }
    if (reason === 'out_of_lives') {
      return 'Bạn đã hết mạng';
    }
    return 'Hết giờ!';
  };

  return (
    <div className="page-card result-card">
      <h2>{getHeadingMessage()}</h2>

      <div className="result-details">
        <p>{`Người chơi: ${name}`}</p>
        <p>{`Số câu trả lời đúng: ${correctCount}`}</p>
        <p>{`Số mạng còn lại: ${livesLeft}`}</p>
        <p className="result-score">{`Điểm: ${formatScore(score)}`}</p>
      </div>

      <div className="result-actions">
        <button
          type="button"
          className="primary-btn"
          onClick={() => navigate('/play')}
        >
          Chơi lại
        </button>
        <button
          type="button"
          className="secondary-btn"
          onClick={() => navigate('/')}
        >
          Về trang chủ
        </button>
      </div>
    </div>
  );
};

export default Result;