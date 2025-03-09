import { House, Store } from "lucide-react";
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
    // icon: <House />,
  },
  {
    name: "Campaigns",
    link: "/campaigns",
    // icon: <Store />,
  },
];
