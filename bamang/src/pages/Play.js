import React, { useState, useEffect, useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { TOTAL_TIME, MAX_LIVES, LETTERS } from '../data';
import { calcScoreAndStreak } from '../utils';
import StatusBar from '../components/StatusBar';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';
import Helpers from '../components/Helpers';

const Play = ({ questions, playerName, onAddHistory }) => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [lives, setLives] = useState(MAX_LIVES);
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState('answering'); // 'answering' | 'locked' | 'revealed'
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [hiddenOptions, setHiddenOptions] = useState([]);
  const [usedHelpers, setUsedHelpers] = useState({
    fiftyFifty: false,
    skip: false,
    extraLife: false,
  });

  const currentQuestion = questions[currentIndex];
  const { score, streak } = calcScoreAndStreak(results, questions);

  const finishGame = useCallback(
    (finalResults, finalLives, reason) => {
      const { score: finalScore } = calcScoreAndStreak(finalResults, questions);
      const correctCount = finalResults.filter((r) => r === 'correct').length;

      const record = {
        id: Date.now(),
        name: playerName.trim(),
        score: finalScore,
        correctCount,
        livesLeft: finalLives,
        playedAt: new Date().toLocaleString('vi-VN'),
      };

      onAddHistory(record);

      navigate('/result', {
        replace: true,
        state: {
          name: playerName.trim(),
          score: finalScore,
          correctCount,
          livesLeft: finalLives,
          reason,
        },
      });
    },
    [questions, playerName, onAddHistory, navigate]
  );

  const handleSelectAnswer = useCallback(
    (index) => {
      if (status !== 'answering' || hiddenOptions.includes(index)) {
        return;
      }
      setSelectedAnswer(index);
      setStatus('locked');
    },
    [status, hiddenOptions]
  );

  // 1. Đồng hồ chung 90 giây
  useEffect(() => {
    if (!playerName.trim() || status !== 'answering') {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [status, playerName]);

  // Kết thúc ngay khi đồng hồ về 0
  useEffect(() => {
    if (playerName.trim() && timeLeft === 0 && status === 'answering') {
      finishGame(results, lives, 'timeout');
    }
  }, [timeLeft, status, results, lives, playerName, finishGame]);

  // 2. Chờ 1 giây lộ kết quả, 1 giây sang câu tiếp theo
  useEffect(() => {
    if (!playerName.trim() || !currentQuestion) {
      return undefined;
    }

    if (status === 'locked') {
      const timerId = setTimeout(() => {
        setStatus('revealed');
      }, 1000);

      return () => {
        clearTimeout(timerId);
      };
    }

    if (status === 'revealed') {
      const timerId = setTimeout(() => {
        const isCorrect = selectedAnswer === currentQuestion.answer;
        const nextResults = [...results, isCorrect ? 'correct' : 'wrong'];
        const nextLives = isCorrect ? lives : lives - 1;
        const isLastQuestion = currentIndex >= questions.length - 1;

        if (nextLives <= 0) {
          finishGame(nextResults, 0, 'out_of_lives');
        } else if (isLastQuestion) {
          const allCorrect =
            nextResults.length === questions.length &&
            nextResults.every((r) => r === 'correct');
          finishGame(nextResults, nextLives, allCorrect ? 'perfect' : 'completed');
        } else {
          setResults(nextResults);
          setLives(nextLives);
          setCurrentIndex((prev) => prev + 1);
          setSelectedAnswer(null);
          setHiddenOptions([]);
          setStatus('answering');
        }
      }, 1000);

      return () => {
        clearTimeout(timerId);
      };
    }

    return undefined;
  }, [
    status,
    selectedAnswer,
    currentQuestion,
    results,
    lives,
    currentIndex,
    questions.length,
    playerName,
    finishGame,
  ]);

  // 3. Phím tắt A, B, C, D
  useEffect(() => {
    if (!playerName.trim()) {
      return undefined;
    }

    const handleKey = (e) => {
      if (status !== 'answering') {
        return;
      }
      const keyUpper = e.key.toUpperCase();
      const optionIndex = LETTERS.indexOf(keyUpper);
      if (optionIndex !== -1 && !hiddenOptions.includes(optionIndex)) {
        handleSelectAnswer(optionIndex);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, [status, hiddenOptions, handleSelectAnswer, playerName]);

  // 4. Tiêu đề tab trình duyệt
  useEffect(() => {
    if (!playerName.trim() || questions.length === 0) {
      return undefined;
    }
    document.title = `Câu ${currentIndex + 1}/${questions.length} – còn ${lives} mạng`;

    return () => {
      document.title = 'Thử thách 3 mạng';
    };
  }, [currentIndex, lives, questions.length, playerName]);

  if (!playerName.trim()) {
    return <Navigate to="/" replace />;
  }

  if (!currentQuestion) {
    return null;
  }

  const handleUseFiftyFifty = () => {
    if (status !== 'answering' || usedHelpers.fiftyFifty) {
      return;
    }
    const wrongIndices = [0, 1, 2, 3].filter(
      (idx) => idx !== currentQuestion.answer
    );
    const shuffledWrong = [...wrongIndices].sort(() => Math.random() - 0.5);
    setHiddenOptions(shuffledWrong.slice(0, 2));
    setUsedHelpers((prev) => ({ ...prev, fiftyFifty: true }));
  };

  const handleUseSkip = () => {
    if (status !== 'answering' || usedHelpers.skip) {
      return;
    }
    const nextResults = [...results, 'skipped'];
    setUsedHelpers((prev) => ({ ...prev, skip: true }));

    if (currentIndex >= questions.length - 1) {
      finishGame(nextResults, lives, 'completed');
    } else {
      setResults(nextResults);
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setHiddenOptions([]);
    }
  };

  const handleUseExtraLife = () => {
    if (
      status !== 'answering' ||
      usedHelpers.extraLife ||
      lives >= MAX_LIVES
    ) {
      return;
    }
    setLives((prev) => Math.min(prev + 1, MAX_LIVES));
    setUsedHelpers((prev) => ({ ...prev, extraLife: true }));
  };

  return (
    <div className="play-page">
      <StatusBar
        timeLeft={timeLeft}
        lives={lives}
        score={score}
        streak={streak}
      />

      <ProgressBar
        totalQuestions={questions.length}
        results={results}
        currentIndex={currentIndex}
      />

      <Helpers
        status={status}
        lives={lives}
        usedHelpers={usedHelpers}
        onUseFiftyFifty={handleUseFiftyFifty}
        onUseSkip={handleUseSkip}
        onUseExtraLife={handleUseExtraLife}
      />

      <QuestionCard
        question={currentQuestion}
        currentIndex={currentIndex}
        totalQuestions={questions.length}
        hiddenOptions={hiddenOptions}
        status={status}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={handleSelectAnswer}
      />
    </div>
  );
};

export default Play;