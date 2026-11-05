import React from 'react';
import { formatScore } from '../data';

const StatusBar = ({ timeLeft, lives, score, streak }) => {
  return (
    <div className="status-bar">
      <div className={`status-item ${timeLeft <= 15 ? 'time-warning' : ''}`}>
        {`Thời gian: ${timeLeft} giây`}
      </div>
      <div className="status-item">
        <span>{`Mạng: ${lives} `}</span>
        {Array.from({ length: lives }, (_, idx) => (
          <span key={idx} className="heart-icon">
            ❤️
          </span>
        ))}
      </div>
      <div className="status-item">{`Điểm: ${formatScore(score)}`}</div>
      <div className="status-item">{`Chuỗi đúng: ${streak}`}</div>
    </div>
  );
};

export default StatusBar;