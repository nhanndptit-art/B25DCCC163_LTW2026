import React from 'react';

const ProgressBar = ({ totalQuestions, results, currentIndex }) => {
  return (
    <div className="progress-bar">
      {Array.from({ length: totalQuestions }, (_, index) => {
        const result = results[index];
        let statusClass = 'progress-upcoming';

        if (result === 'correct') {
          statusClass = 'progress-correct';
        } else if (result === 'wrong') {
          statusClass = 'progress-wrong';
        }

        const currentClass = index === currentIndex ? 'progress-current' : '';

        return (
          <div
            key={index}
            className={`progress-step ${statusClass} ${currentClass}`}
          >
            {index + 1}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;