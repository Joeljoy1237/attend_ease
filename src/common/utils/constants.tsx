import { MdSpaceDashboard } from "react-icons/md";
import { IoIosStats } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { RiSettings3Fill } from "react-icons/ri";

export const sideBarMenu: SideBarMenuItem[] = [
  {
    name: "Home",
    link: "/home",
    icon: MdSpaceDashboard,
    rightsToView: ["admin", "faculty", "student"],
  },
  {
    name: "Attendance",
    link: "/attendance",
    icon: IoIosStats,
    rightsToView: ["admin", "faculty"],
  },
  {
    name: "Batches",
    link: "/batches",
    icon: FaUsers,
    rightsToView: ["admin", "faculty"],
  },
  {
    name: "Manage",
    link: "/manage",
    icon: RiSettings3Fill,
    rightsToView: ["admin"],
  },
];