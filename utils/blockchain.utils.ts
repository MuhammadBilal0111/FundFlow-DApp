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
      timestamp: new Date(Number(project[8]) * 1000).getTime(), // Convert UNIX timestamp to milliseconds
      expiresAt: new Date(Number(project[9]) * 1000).getTime(), // Convert UNIX timestamp to milliseconds
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
      timestamp: new Date(Number(backer[2]) * 1000).getTime(),
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
