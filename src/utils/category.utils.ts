/**
 * Returns only top-level parent categories
 * (categories without a parent)
 */
export const getParentCategories = (categories: any[]): any[] => {
  return categories.filter((category) => category.parent === null);
};
