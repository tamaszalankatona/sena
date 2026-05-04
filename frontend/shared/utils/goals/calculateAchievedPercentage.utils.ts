export const calculateAchievedPercentage = (
  alreadySaved: number,
  target: number,
): number => {
  if (target === 0) return 0;
  return Math.round((alreadySaved / target) * 100);
};
