import { User, BookMarked, History, EyeOff, Settings } from "lucide-react";

export type TabId = "personal" | "active" | "swapped" | "inactive" | "settings";

export interface NavItem {
  id: TabId;
  label: string;
  path: string;
  icon: React.ElementType;
}

export const PROFILE_NAV_ITEMS: NavItem[] = [
  {
    id: "personal",
    label: "Personal Information",
    path: "/personal",
    icon: User,
  },
  {
    id: "active",
    label: "Active Listings",
    path: "/active",
    icon: BookMarked,
  },
  {
    id: "swapped",
    label: "My Swaps",
    path: "/swapped",
    icon: History,
  },
  {
    id: "inactive",
    label: "Inactive Listings",
    path: "/inactive",
    icon: EyeOff,
  },
  {
    id: "settings",
    label: "Account Settings",
    path: "/settings",
    icon: Settings,
  },
];
