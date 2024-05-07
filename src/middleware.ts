import { auth } from "./auth";

export default auth((req) => {
  // const isLoggedIn = !!req.auth
  console.log(req.nextUrl.pathname);
  // console.log(isLoggedIn)
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // <-- authjs matcher
  // matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"], // <-- custom matcher (not sure if it's better)
};
