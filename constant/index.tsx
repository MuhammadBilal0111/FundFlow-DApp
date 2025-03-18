import { House, Pencil, Store } from "lucide-react";
import { ReactNode } from "react";

interface NavItem {
  name: string;
  link: string;
  icon?: ReactNode; // Use ReactNode for broader compatibility
}
export const navItems: NavItem[] = [
  {
    name: "Home",
    link: "/",
    icon: <House size={18} />,
  },
  {
    name: "Campaigns",
    link: "/campaigns",
    icon: <Store size={18} />,
  },
  {
    name: "Create Campaigns",
    link: "/campaigns?tab=create-campaign",
    icon: <Pencil size={18} />,
  },
];
export const sidebarLinks = [
  {
    imgURL: "/assets/create.svg",
    route: "/dashboard?tab=create-campaign",
    label: "Create Campaign",
  },
  {
    imgURL: "/assets/view.svg",
    route: "/dashboard?tab=view-campaign",
    label: "View Campaigns",
  },
];

