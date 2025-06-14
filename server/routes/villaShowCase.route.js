import { Router } from "express";
import * as villaShowcaseController from "../controllers/villaShowcase.controller.js";

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

export default villaShowCaseRouter;
