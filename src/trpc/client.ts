import { TAppRouter } from "./index";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<TAppRouter>({});
