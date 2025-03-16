export interface Project {
  id: number;
  owner: string;
  title: string;
  description: string;
  slug: string;
  imageURL: string;
  cost: number;
  raised: number;
  timestamp: number;
  expiresAt: number;
  date: string;
  backers: number;
  status: number;
}
