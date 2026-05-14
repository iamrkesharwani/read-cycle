import { BookMarked, EyeOff, History, Settings, User } from "lucide-react";

export type TabId = "personal" | "active" | "swapped" | "inactive" | "settings";

export const navItems: {
  id: TabId;
  label: string;
  icon: React.ElementType;
}[] = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "swapped", label: "My Swaps", icon: History },
  {
    id: "active",
    label: "Active",
    icon: BookMarked,
  },
  {
    id: "inactive",
    label: "Inactive",
    icon: EyeOff,
  },
  { id: "settings", label: "Settings", icon: Settings },
];
