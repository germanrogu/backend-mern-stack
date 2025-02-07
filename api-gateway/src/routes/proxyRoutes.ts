import { Router } from "express";
import proxy from "express-http-proxy";
import { authServiceURL, taskServiceURL } from "../config/gatewayConfig";
import logger from "../utils/logger";

const router = Router();

// Proxy para Auth Service
router.use(
  "/auth",
  proxy(authServiceURL, {
    proxyReqPathResolver: (req: { url: any }) => {
      logger.info(`req: ${req}`);
      const url = `/api/auth${req.url}`;
      logger.info(`Proxying Auth request to: ${url}`);
      return url;
    },
  })
);

// Proxy para Task Service
router.use(
  "/tasks",
  proxy(taskServiceURL, {
    proxyReqPathResolver: (req: { url: any }) => {
      const url = `/api/tasks${req.url}`;
      logger.info(`Proxying Task request to: ${url}`);
      return url;
    },
  })
);

export default router;
