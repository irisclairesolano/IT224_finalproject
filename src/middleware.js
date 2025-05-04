import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/signin", // Update this to match the new path
  },
});

export const config = {
  matcher: ["/:path*"], // Protect all routes
};