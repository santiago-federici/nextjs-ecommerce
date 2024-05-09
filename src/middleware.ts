import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default function middleware(req: Request) {
  return withAuth();
}

export const config = {
  matcher: ["/products"],
};

// export default withAuth(
//   async function middleware(req: any) {
//     console.log("look at me", req.kindeAuth);
//   },
//   {
//     isReturnToCurrentPage: true,
//     loginPage: "/login",
//     isAuthorized: ({ token }: any) => {
//       // The user will be considered authorized if they have the permission 'eat:chips'
//       return token.permissions.includes("eat:chips");
//     },
//   }
// );
