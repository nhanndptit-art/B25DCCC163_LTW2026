import React from 'react';
import { LETTERS } from '../data';

const AnswerButton = ({
  index,
  option,
  status,
  isSelected,
  isCorrect,
  onSelect,
}) => {
  let stateClass = '';
  if (status === 'locked' && isSelected) {
    stateClass = 'answer-locked';
  } else if (status === 'revealed') {
    if (isCorrect) {
      stateClass = 'answer-correct';
    } else if (isSelected && !isCorrect) {
      stateClass = 'answer-wrong';
    }
  }

  return (
    <button
      type="button"
      className={`answer-btn ${stateClass}`}
      disabled={status !== 'answering'}
      onClick={() => onSelect(index)}
    >
      {`${LETTERS[index]}. ${option}`}
    </button>
  );
};

export default AnswerButton;