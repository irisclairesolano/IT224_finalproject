"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback } from "react";
import { useSidebar } from "../context/SidebarContext";
/* Removed icon imports to replace with img tags */
// import { GridIcon, UserCircleIcon } from "../assets/icons/index";
import { FiFileText, FiMessageCircle, FiUsers } from "react-icons/fi"; // Import new icons

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
};

const navItems: NavItem[] = [
  {
    icon: <img src="/my-icons/grid.svg" alt="Grid Icon" className="inline-block w-6 h-6" />,
    name: "Dashboard",
    path: "/",
  },
  {
    icon: <img src="/my-icons/user-circle.svg" alt="User Circle Icon" className="inline-block w-6 h-6" />,
    name: "User Profile",
    path: "/profile",
  },
  {
    icon: <FiUsers />, // Icon for Manage Users
    name: "Manage Users",
    path: "/users",
  },
  {
    icon: <FiFileText />, // Icon for Manage Posts
    name: "Manage Posts",
    path: "/manage-posts",
  },
  {
    icon: <FiMessageCircle />,
    name: "Manage Comments",
    path: "/manage-comments",
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const renderMenuItems = (navItems: NavItem[]) => (
    <ul className="flex flex-col gap-4">
      {navItems.map((nav) => (
        <li key={nav.name}>
          {nav.path && (
            <Link
              href={nav.path}
              className={`menu-item group ${
                isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
              }`}
            >
              <span
                className={`${
                  isActive(nav.path)
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className={`menu-item-text`}>{nav.name}</span>
              )}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen ? "w-[290px]" : isHovered ? "w-[290px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo Section */}
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              Snapxz
            </span>
          ) : (
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              LI
            </span>
          )}
        </Link>
      </div>

      {/* Navigation Menu */}
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <h2
              className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
              }`}
            >
              {isExpanded || isHovered || isMobileOpen ? "Menu" : "☰"}
            </h2>
            {renderMenuItems(navItems)}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;