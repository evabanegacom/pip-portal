import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/redux/store';
import { setCurrentRoute } from '@/redux/request-slices/route-slice';
import { RoutePath } from '@/routes';
import { UserRole } from '@/types/types';
import type { UserRole as UserRoleType } from '@/types/types';

// Lucide icons
import { FileText, LayoutGrid } from 'lucide-react';

// Helper to build full dashboard paths consistently
const dashboardPath = (subPath: string = ''): string =>
  subPath ? `${RoutePath.DASHBOARD}/${subPath}` : RoutePath.DASHBOARD;

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  
  // Get currentRoute from Redux
  const currentRoute = useSelector((state: RootState) => state?.route?.currentRoute);
  
  // Temporary hardcoded role – replace with real auth later
  const userRole = 'Supervisor' as UserRoleType;

  // Sync route with location
  useEffect(() => {
    dispatch(setCurrentRoute(location.pathname));
  }, [location.pathname, dispatch]);

  // If no role → minimal fallback
  if (!userRole) {
    return (
      <div className="w-64 bg-gray-800 text-white h-screen p-6">
        <p className="text-center text-gray-400">Please log in to continue</p>
      </div>
    );
  }

  // Role-based menu items
  const sidebarRoutes: { name: string; path: string }[] = [
    // Regular User
    ...(userRole === UserRole.USER
      ? [
          {
            name: 'Take Assessment',
            path: dashboardPath(RoutePath.TAKE_ASSESSMENT),
          },
          {
            name: 'View PIP',
            path: dashboardPath(RoutePath.VIEW_PIP_REQUEST),
          },
        ]
      : []),

    // Admin
    ...(userRole === UserRole.ADMIN
      ? [
          {
            name: 'Create PIP Request',
            path: dashboardPath(RoutePath.CREATE_PIP_REQUEST),
          },
          {
            name: 'View PIP Requests',
            path: dashboardPath(RoutePath.VIEW_PIP_REQUESTS),
          },
        ]
      : []),

    // Supervisor / Second Supervisor
    ...(userRole === UserRole.SUPERVISOR || userRole === UserRole.SECONDSUPERVISOR
      ? [
          {
            name: 'Review PIP Requests',
            path: dashboardPath(RoutePath.VIEW_PIP_REQUESTS),
          },
        ]
      : []),
  ];

  return (
    <aside className="w-56 shrink-0 bg-white text-[#555555] h-screen flex flex-col border-r border-gray-200">
      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-6 overflow-y-auto">
        <ul className="space-y-1">
          {sidebarRoutes.map((item) => {
            const isActive =
              currentRoute === item.path ||
              currentRoute.startsWith(`${item.path}/`) ||
              currentRoute.startsWith(`${item.path}?`);

            // Decide icon based on name (View → FileText, Review → LayoutGrid)
            let IconComponent = null;
            if (item.name.toLowerCase().includes('view')) {
              IconComponent = FileText;
            } else if (item.name.toLowerCase().includes('review')) {
              IconComponent = LayoutGrid;
            }else if (item.name.toLowerCase().includes('create')) {
              IconComponent = LayoutGrid;
            }else if (item.name.toLowerCase().includes('take')) {
              IconComponent = LayoutGrid;
            }

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={() =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-red-50 text-[#DB353A]'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                >
                  {IconComponent && (
                    <IconComponent
                      size={20}
                      className={isActive ? 'text-[#DB353A]' : 'text-gray-500'}
                    />
                  )}
                  <span>{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;