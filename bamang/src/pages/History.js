import React from 'react';
import { formatScore } from '../data';

const History = ({ history, onClearHistory }) => {
  if (history.length === 0) {
    return (
      <div className="page-card">
        <h2>Lịch sử các lượt chơi</h2>
        <p>Chưa có lượt chơi nào</p>
      </div>
    );
  }

  const sortedHistory = [...history].sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return b.livesLeft - a.livesLeft;
  });

  const highestScore = history.reduce(
    (max, item) => (item.score > max ? item.score : max),
    0
  );

  const totalCorrect = history.reduce(
    (sum, item) => sum + item.correctCount,
    0
  );

  return (
    <div className="page-card">
      <div className="history-header">
        <h2>Lịch sử các lượt chơi</h2>
        <button
          type="button"
          className="danger-btn"
          onClick={onClearHistory}
        >
          Xóa lịch sử
        </button>
      </div>

      <div className="history-stats">
        <p>{`Số lượt chơi: ${history.length}`}</p>
        <p>{`Điểm cao nhất: ${formatScore(highestScore)}`}</p>
        <p>{`Tổng số câu trả lời đúng: ${totalCorrect}`}</p>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Người chơi</th>
            <th>Số câu đúng</th>
            <th>Mạng còn lại</th>
            <th>Điểm</th>
            <th>Thời gian</th>
          </tr>
        </thead>
        <tbody>
          {sortedHistory.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.correctCount}</td>
              <td>{item.livesLeft}</td>
              <td>{formatScore(item.score)}</td>
              <td>{item.playedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;