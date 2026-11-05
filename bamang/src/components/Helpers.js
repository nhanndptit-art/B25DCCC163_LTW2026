import React from 'react';
import { MAX_LIVES } from '../data';

const Helpers = ({
  status,
  lives,
  usedHelpers,
  onUseFiftyFifty,
  onUseSkip,
  onUseExtraLife,
}) => {
  const isAnswering = status === 'answering';

  return (
    <div className="helpers-bar">
      <button
        type="button"
        className="helper-btn"
        disabled={!isAnswering || usedHelpers.fiftyFifty}
        onClick={onUseFiftyFifty}
      >
        50:50
      </button>
      <button
        type="button"
        className="helper-btn"
        disabled={!isAnswering || usedHelpers.skip}
        onClick={onUseSkip}
      >
        Bỏ qua
      </button>
      <button
        type="button"
        className="helper-btn"
        disabled={!isAnswering || usedHelpers.extraLife || lives >= MAX_LIVES}
        onClick={onUseExtraLife}
      >
        Thêm 1 mạng
      </button>
    </div>
  );
};

export default Helpers;