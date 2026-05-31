import type { LucideIcon } from "lucide-react";
import {
  CalendarDays,
  Camera,
  GraduationCap,
  Home,
  Info,
  Mail,
  Megaphone,
  School,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon?: LucideIcon;
};

export const publicNav: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/about", icon: Info },
  { label: "Academics", href: "/academics", icon: GraduationCap },
  { label: "Admissions", href: "/admissions", icon: School },
  { label: "Gallery", href: "/gallery", icon: Camera },
  { label: "Notices", href: "/notices", icon: Megaphone },
  { label: "Events", href: "/events", icon: CalendarDays },
  { label: "Contact", href: "/contact", icon: Mail },
];

export const adminNav: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: Home },
  { label: "Notices", href: "/admin/notices", icon: Megaphone },
  { label: "Gallery", href: "/admin/gallery", icon: Camera },
  { label: "Events", href: "/admin/events", icon: CalendarDays },
  { label: "Inquiries", href: "/admin/inquiries", icon: Mail },
];
