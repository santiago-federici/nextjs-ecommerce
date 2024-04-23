import { router, publicProcedure } from "./trpc";

export const appRouter = router({
  anyApiRoute: publicProcedure.query(() => {
    return "hello world!";
  }),
});

export type TAppRouter = typeof appRouter;
