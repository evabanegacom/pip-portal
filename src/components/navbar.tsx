import { ChevronDownIcon, LogOut } from "lucide-react";
import { useEffect, useRef, useState, type JSX } from "react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import logo from "../assets/logo.svg";

export const Navbar = (): JSX.Element => {
  const user = {
    firstName: "John",
    lastName: "Doe",
    role: "Administrator",
  };

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setOpen((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get initials
  const getInitials = () => {
    const first = user?.firstName?.charAt(0)?.toUpperCase() || "";
    const last = user?.lastName?.charAt(0)?.toUpperCase() || "";
    return `${first}${last}`;
  };

  const handleLogout = () => {
    // Add your logout logic here (e.g. clear token, redirect to login)
    console.log("User logged out");
    // Example: window.location.href = "/login";
    setOpen(false);
  };

  return (
    <header className="h-16 bg-[#2A3447] border-b border-[#e0e0e0] flex items-center justify-between px-3 sm:px-6 lg:px-8 z-[1000] shadow-sm">
      {/* Logo and Branding Section */}
      <Link className="flex items-center gap-3 py-2" to="/dashboard">
        <img
          src={logo}
          alt="Staff Exit Logo"
          className="h-10 sm:h-12 lg:h-10 pr-5"
        />
        <Separator orientation="vertical" className="h-6 sm:h-8 lg:h-10" />
        <div className="pt-2 hidden sm:block font-inter-body-sm-bold text-white text-sm">
          Performance Improvement Plan (PIP)
        </div>
      </Link>

      {/* User Profile Section with Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center gap-2 sm:gap-3 focus:outline-none p-1.5 hover:bg-gray-700/70 rounded-lg transition-colors"
          onClick={toggleDropdown}
          aria-expanded={open}
          aria-haspopup="true"
        >
          {/* Avatar with Initials */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium text-sm sm:text-base shadow-sm">
            {getInitials()}
          </div>

          {/* User Details (desktop) */}
          <div className="hidden sm:flex flex-col items-start text-left">
            <div className="font-inter-body-sm-bold text-white text-sm">
              {user?.firstName} {user?.lastName || ""}
            </div>
            <div className="font-inter-body-sm-regular text-gray-300 text-xs">
              {user?.role}
            </div>
          </div>

          {/* Mobile: just first name + chevron */}
          <div className="sm:hidden flex items-center gap-1.5">
            <span className="text-sm font-medium text-white">{user?.firstName}</span>
            <ChevronDownIcon
              className={`h-4 w-4 text-gray-300 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </div>

          {/* Chevron for desktop */}
          <ChevronDownIcon
            className={`hidden sm:block h-4 w-4 text-gray-300 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown Menu */}
        {open && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
            {/* <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div> */}

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};