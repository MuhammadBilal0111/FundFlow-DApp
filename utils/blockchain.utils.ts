// helper function to format the projects details
export const structuredProjects = (projects: any[]) => {
  return projects
    ?.map((project) => ({
      id: Number(project[0]), // Convert BigInt to a number
      owner: project[1]?.toLowerCase(), // Ethereum address in lowercase
      title: project[2], // Title as a string
      description: project[3], // Description as a string
      slug: project[4], // Slug as a string
      imageURL: project[5], // Image URL as a string
      cost: Number(project[6]) / 10 ** 18, // Convert BigInt (wei) to Ether
      raised: Number(project[7]) / 10 ** 18, // Convert BigInt (wei) to Ether
      timestamp: formatTimestampToDate(Number(project[8]) * 1000), // Convert UNIX timestamp to milliseconds
      expiresAt: formatTimestampToDate(Number(project[9]) * 1000), // Convert UNIX timestamp to milliseconds
      date: toDate(Number(project[9]) * 1000), // Format UNIX timestamp
      backers: Number(project[10]), // Convert BigInt to number
      status: Number(project[11]), // Convert BigInt to number
    }))
    .reverse();
};

// helper function to format the Backers
export const structuredBackers = (backers: any[]) => {
  return backers
    ?.map((backer) => ({
      owner: backer[0]?.toLowerCase(),
      contribution: Number(backer[1]) / 10 ** 18,
      timestamp: toDate(Number(backer[2]) * 1000),
      refunded: backer[3],
    }))
    .reverse();
};

// helper function to format the statistics
export const structureStats = (stats: any) => ({
  totalProjects: Number(stats[0]),
  totalBacking: Number(stats[1]),
  totalDonations: Number(stats[2]) / 10 ** 18,
});

// helper function format the date
const toDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const dd = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  const mm =
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`; // date.getMonth() returns the month index (0-based, meaning January = 0).
  const yyyy = date.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};
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
