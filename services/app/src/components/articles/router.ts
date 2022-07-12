import type CoreExpress from "express";
import articleController from "./controller";

const articleRouter = (express: typeof CoreExpress) => {
  const router = express.Router();
  const controller = articleController();

  router.route("/articles").post(controller.articleAdding);

  router.route("/articles").get(controller.articleListing);

  return router;
};

export default articleRouter;