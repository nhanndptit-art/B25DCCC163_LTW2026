import React from 'react';
import { LEVELS, POINTS, formatScore } from '../data';
import AnswerButton from './AnswerButton';

const QuestionCard = ({
  question,
  currentIndex,
  totalQuestions,
  hiddenOptions,
  status,
  selectedAnswer,
  onSelectAnswer,
}) => {
  return (
    <div className="question-card">
      <div className="question-meta">
        {`Câu ${currentIndex + 1}/${totalQuestions} – ${LEVELS[question.level]} – ${formatScore(POINTS[question.level])}`}
      </div>
      <h3 className="question-title">{question.question}</h3>
      <div className="answers-grid">
        {question.options.map((option, index) => (
          <AnswerButton
            key={index}
            index={index}
            option={option}
            isHidden={hiddenOptions.includes(index)}
            status={status}
            isSelected={selectedAnswer === index}
            isCorrect={question.answer === index}
            onSelect={onSelectAnswer}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;