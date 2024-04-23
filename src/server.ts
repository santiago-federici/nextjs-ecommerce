import express from "express";
import { getPayloadClient } from "./utils/getPayload";
import { nextApp, nextHandler } from "./utils/nextHandler";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc/index";

const app = express();

const PORT = process.env.PORT || 3000;

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({
  req,
  res,
});

const start = async () => {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
      },
    },
  });

  app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    payload.logger.info("Nextjs started");

    app.listen(PORT, async () => {
      payload.logger.info(
        `Nextjs App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`
      );
    });
  });
};

start();
