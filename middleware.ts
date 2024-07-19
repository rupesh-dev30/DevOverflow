import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define the routes that should be public
const isPublicRoute = createRouteMatcher([
  "/",
  "/api/webhook",
  "/question/:id",
  "/tags",
  "/tags/:id",
  "/profile/:id",
  "/community",
  "/jobs"
]);

// Define the routes that should be ignored
const isIgnoredRoute = createRouteMatcher([
  "/api/webhook",
  "/api/chatgpt"
]);

export default clerkMiddleware((auth, req) => {
  // If the route is ignored, skip the middleware
  if (isIgnoredRoute(req)) return;

  // If the route is not public, apply authentication
  if (!isPublicRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
};
