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
  return BigInt(dateObj / 1000);
};
