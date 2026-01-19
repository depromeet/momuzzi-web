export const getProgressPercent = (value: number, total: number) => {
  if (value > total) return 100;
  if (value < 1) return 0;
  return (value / total) * 100;
};
