export const sortShoppingItems = <T extends { completed: boolean; createdAt: Date }>(
  items: T[]
): T[] => {
  return [...items].sort((a, b) => {
    // First, sort by completion status
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    // Then sort by creation date (newest first)
    return b.createdAt.getTime() - a.createdAt.getTime();
  });
};