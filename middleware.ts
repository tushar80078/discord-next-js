import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
 
  publicRoutes: ['/api/uploadthing'],
 
  ignoredRoutes: ['/no-auth-in-this-route'],
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};