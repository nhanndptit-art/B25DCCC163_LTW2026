import React, { useState, useEffect, useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { TOTAL_TIME, MAX_LIVES } from '../data';
import { calcScoreAndStreak } from '../utils';
import StatusBar from '../components/StatusBar';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';

const Play = ({ questions, playerName }) => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [lives, setLives] = useState(MAX_LIVES);
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState('answering'); // 'answering' | 'locked' | 'revealed'
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const currentQuestion = questions[currentIndex];
  const { score, streak } = calcScoreAndStreak(results, questions);

  const finishGame = useCallback(
    (finalResults, finalLives, reason) => {
      const { score: finalScore } = calcScoreAndStreak(finalResults, questions);
      const correctCount = finalResults.filter((r) => r === 'correct').length;

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
    [questions, playerName, navigate]
  );

  const handleSelectAnswer = (index) => {
    if (status !== 'answering') {
      return;
    }
    setSelectedAnswer(index);
    setStatus('locked');
  };

  // Đồng hồ chung 90 giây, chỉ chạy khi status === 'answering'
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

  // Về 0 giây thì kết thúc ngay
  useEffect(() => {
    if (playerName.trim() && timeLeft === 0 && status === 'answering') {
      finishGame(results, lives, 'timeout');
    }
  }, [timeLeft, status, results, lives, playerName, finishGame]);

  // Các bước chờ 1 giây lộ kết quả, 1 giây sang câu tiếp theo
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

  if (!playerName.trim()) {
    return <Navigate to="/" replace />;
  }

  if (!currentQuestion) {
    return null;
  }

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

      <QuestionCard
        question={currentQuestion}
        currentIndex={currentIndex}
        totalQuestions={questions.length}
        status={status}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={handleSelectAnswer}
      />
    </div>
  );
};

export default Play;