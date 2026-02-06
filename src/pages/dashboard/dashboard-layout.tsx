import { Outlet } from "react-router-dom"
import Sidebar from "./sidebar"
import { Navbar } from "@/components/navbar"
import type { RootState } from '@/redux/store';
import { useSelector } from "react-redux";

export default function DashboardLayout() {
      const routeNameMap = [
  { pattern: /^\/dashboard$/, name: 'Dashboard Home' },
  { pattern: /^\/dashboard\/create-pip-request$/, name: 'Create PIP Request' },
  { pattern: /^\/dashboard\/take-assessment$/, name: 'Take Assessment' },
  { pattern: /^\/dashboard\/pip-requests$/, name: 'View PIP Requests' },
  { pattern: /^\/dashboard\/review-pip-request(\/\d+)?$/, name: 'Review PIP Request' }, // handles /:id
]

const getRouteName = (path: string) => {
  const match = routeNameMap.find((r) => r.pattern.test(path))
  return match ? match.name : path
}
      const currentRoute = useSelector((state: RootState) => state?.route?.currentRoute);
    
  return (
    <div className="min-h-screen flex flex-col">
      {/* Sidebar / Header can go here */}
      <Navbar />
      <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-50">
        <div className="shadow-md text-[#000000] font-semibold text-lg rounded-md p-3 mb-6">{getRouteName(currentRoute)}</div>
        <Outlet />
      </div>
        </div>
    </div>
  )
}
