import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { LEVELS, POINTS, LETTERS, formatScore } from '../data';

const QuestionDetail = ({ questions }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const questionId = Number(id);
  const question = questions.find((q) => q.id === questionId);

  if (!question) {
    return (
      <div className="page-card">
        <h2>Không tìm thấy câu hỏi</h2>
        <button
          type="button"
          className="secondary-btn"
          onClick={() => navigate(-1)}
        >
          Quay lại
        </button>
      </div>
    );
  }

  const prevQuestion = questions.find((q) => q.id === questionId - 1);
  const nextQuestion = questions.find((q) => q.id === questionId + 1);

  return (
    <div className="page-card">
      <h2>
        {`Câu hỏi số ${question.id} (${LEVELS[question.level]} – ${formatScore(POINTS[question.level])})`}
      </h2>
      <p className="detail-question-text">{question.question}</p>

      <ul className="detail-options-list">
        {question.options.map((opt, index) => {
          const isCorrect = index === question.answer;
          return (
            <li
              key={index}
              className={`detail-option-item ${isCorrect ? 'detail-option-correct' : ''}`}
            >
              <span>{`${LETTERS[index]}. ${opt}`}</span>
              {isCorrect && <strong className="correct-badge"> (Đáp án đúng)</strong>}
            </li>
          );
        })}
      </ul>

      <div className="detail-pagination">
        <div>
          {prevQuestion && (
            <Link to={`/questions/${prevQuestion.id}`} className="nav-step-link">
              ← Câu trước
            </Link>
          )}
        </div>
        <div>
          {nextQuestion && (
            <Link to={`/questions/${nextQuestion.id}`} className="nav-step-link">
              Câu sau →
            </Link>
          )}
        </div>
      </div>

      <div className="detail-actions">
        <button
          type="button"
          className="secondary-btn"
          onClick={() => navigate(-1)}
        >
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default QuestionDetail;