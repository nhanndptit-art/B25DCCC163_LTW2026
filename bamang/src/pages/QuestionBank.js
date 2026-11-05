import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LEVELS, POINTS, formatScore } from '../data';

const QuestionBank = ({ questions }) => {
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredQuestions = questions.filter((q) => {
    const matchLevel =
      selectedLevel === 'all' || q.level === Number(selectedLevel);
    const matchSearch = q.question
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());
    return matchLevel && matchSearch;
  });

  const handleRandomQuestion = () => {
    if (filteredQuestions.length === 0) {
      return;
    }
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    const randomQuestion = filteredQuestions[randomIndex];
    navigate(`/questions/${randomQuestion.id}`);
  };

  return (
    <div className="page-card">
      <h2>Ngân hàng câu hỏi</h2>

      <div className="filter-bar">
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="filter-select"
        >
          <option value="all">Tất cả</option>
          <option value="1">Dễ</option>
          <option value="2">Trung bình</option>
          <option value="3">Khó</option>
        </select>

        <input
          type="text"
          placeholder="Tìm kiếm theo nội dung câu hỏi..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="filter-input"
        />

        <button
          type="button"
          className="primary-btn"
          disabled={filteredQuestions.length === 0}
          onClick={handleRandomQuestion}
        >
          Câu ngẫu nhiên
        </button>
      </div>

      <p className="question-count">{`Có ${filteredQuestions.length} câu hỏi`}</p>

      <table className="data-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mức độ</th>
            <th>Điểm</th>
            <th>Câu hỏi</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.map((q, index) => (
            <tr key={q.id}>
              <td>{index + 1}</td>
              <td>{LEVELS[q.level]}</td>
              <td>{formatScore(POINTS[q.level])}</td>
              <td>
                <Link to={`/questions/${q.id}`} className="table-link">
                  {q.question}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionBank;