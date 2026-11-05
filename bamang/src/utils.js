import { POINTS, STREAK_BONUS } from './data';

export const calcScoreAndStreak = (results, questions) => {
  return results.reduce(
    (acc, result, index) => {
      const question = questions[index];
      if (!question) {
        return acc;
      }

      if (result === 'correct') {
        const nextStreak = acc.streak + 1;
        const baseScore = POINTS[question.level] || 0;
        const bonus = nextStreak >= 3 ? STREAK_BONUS : 0;
        return {
          score: acc.score + baseScore + bonus,
          streak: nextStreak,
        };
      }

      return {
        score: acc.score,
        streak: 0,
      };
    },
    { score: 0, streak: 0 }
  );
};

export const calcScore = (results, questions) => {
  return calcScoreAndStreak(results, questions).score;
};