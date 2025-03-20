export function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Remove multiple hyphens
}
export const dateToTimeStamp = (dateStr: string) => {
  const dateObj = new Date(dateStr).getTime();
  return Number(dateObj / 1000);
};

export const formatTimestampToDate = (timestamp: number) => {
  if (!timestamp) return "Invalid timestamp";
  const date = new Date(Number(timestamp)); // Ensure it's a valid number
  if (isNaN(date.getTime())) return "Invalid timestamp"; // Handle invalid cases
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
  const dd = String(date.getUTCDate()).padStart(2, "0"); // Day
  const yyyy = date.getUTCFullYear(); // Correct year extraction

  return `${mm}/${dd}/${yyyy}`;
};

export function getRemainingDays(expireDate: string): number {
  const currentDate = new Date();
  const expirationDate = new Date(expireDate); // Convert string to Date object

  if (currentDate >= expirationDate) {
    return 0; // If the expiration date has passed, return 0
  }

  const timeDiff = expirationDate.getTime() - currentDate.getTime();
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
}
