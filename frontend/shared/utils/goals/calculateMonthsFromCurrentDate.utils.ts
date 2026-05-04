export const calculateMonthsFromCurrentDate = (deadline: string): number => {
  if (!deadline) return 0;

  const now = new Date();
  const deadlineDate = new Date(deadline);

  return (
    (deadlineDate.getFullYear() - now.getFullYear()) * 12 +
    (deadlineDate.getMonth() - now.getMonth())
  );
};
