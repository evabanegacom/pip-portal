import { lazy, Suspense } from "react"
import type { RouteObject } from "react-router-dom"
import Loader from "./components/loader/loader"

// Lazy pages
const LoginPage = lazy(() => import("@/pages/authentication/login"))
const DashboardLayout = lazy(() => import("@/pages/dashboard/dashboard-layout"))
const CreatePipRequest = lazy(() => import("@/pages/dashboard/create-pip-request"))
const TakeAssessment = lazy(() => import("@/pages/dashboard/take-assessment"))
const ViewPipRequests = lazy(() => import("@/pages/dashboard/pip-requests"))
const ReviewPipRequest = lazy(() => import("@/pages/dashboard/review-pip-request"))
const ViewPipRequest = lazy(() => import("@/pages/dashboard/view-pip-request"))

export const RoutePath = {
  LOGIN: "/",
  DASHBOARD: "/dashboard",
  CREATE_PIP_REQUEST: "create-pip-request",
  TAKE_ASSESSMENT: "take-assessment",
  VIEW_PIP_REQUESTS: "pip-requests",
  REVIEW_PIP_REQUEST: "review-pip-request/:id",
  VIEW_PIP_REQUEST: "view-pip-request",
}

export const routes: RouteObject[] = [
  {
    path: RoutePath.LOGIN,
    element: (
      <Suspense fallback={<Loader />}>
        <LoginPage />
      </Suspense>
    ),
  },

  {
    path: RoutePath.DASHBOARD,
    element: (
      <Suspense fallback={<Loader />}>
        <DashboardLayout />
      </Suspense>
    ),
    children: [
      {
        path: RoutePath.CREATE_PIP_REQUEST,
        element: (
          <Suspense fallback={<Loader />}>
            <CreatePipRequest />
          </Suspense>
        ),
      },
      {
        path: RoutePath.TAKE_ASSESSMENT,
        element: (
          <Suspense fallback={<Loader />}>
            <TakeAssessment />
          </Suspense>
        ),
      },
      {
        path: RoutePath.VIEW_PIP_REQUESTS,
        element: (
          <Suspense fallback={<Loader />}>
            <ViewPipRequests />
          </Suspense>
        ),
      },
      {
        path: RoutePath.VIEW_PIP_REQUEST,
        element: (
          <Suspense fallback={<Loader />}>
            <ViewPipRequest />
          </Suspense>
        ),
      },
      {
        path: RoutePath.REVIEW_PIP_REQUEST,
        element: (
          <Suspense fallback={<Loader />}>
            <ReviewPipRequest />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "*",
    element: <div>Page not found</div>,
  },
]
