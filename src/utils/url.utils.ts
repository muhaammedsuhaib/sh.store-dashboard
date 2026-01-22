/**
 * Check whether a string is a valid HTTP/HTTPS URL
 */
export const is_valid_url = (value: string): boolean => {
  if (!value) return false;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};
