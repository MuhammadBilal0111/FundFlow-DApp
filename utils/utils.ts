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
