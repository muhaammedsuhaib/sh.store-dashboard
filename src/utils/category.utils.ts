import type { Category } from "../types/category";

/**
 * Returns only top-level parent categories
 * (categories without a parent)
 */
export const getParentCategories = (categories: Category[]): Category[] => {
  return categories.filter((category) => category.parent === null);
};
