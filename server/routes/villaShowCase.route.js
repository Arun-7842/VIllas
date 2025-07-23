import { Router } from "express";
import * as villaShowcaseController from "../controllers/villaShowcase.controller.js";
import auth from "../middleware/auth.js";

const villaShowCaseRouter = Router();

villaShowCaseRouter.post(
  "/add-villa-show-case",
  villaShowcaseController.AddVillaShowCase
);
villaShowCaseRouter.get("/get", villaShowcaseController.getVillaController);
villaShowCaseRouter.get("/get/:id", villaShowcaseController.getVillaController);
villaShowCaseRouter.put(
  "/update/:id",
  villaShowcaseController.updateVillaController
);
villaShowCaseRouter.delete(
  "/delete/:id",
  villaShowcaseController.deleteVillaController
);

villaShowCaseRouter.post(
  "/add-review-to-villa/:id",
  auth,
  villaShowcaseController.addReviewToVilla
);

export default villaShowCaseRouter;
