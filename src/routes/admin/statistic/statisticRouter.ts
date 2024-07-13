import { Router } from "express";
import { generalStatistic } from "./generalStatistic";
import { ModuleStatisticHelper } from "./statistic.init";
import { userStatistic } from "./statisticForUser";
const router = Router();

// router.get("/projects", projectStatistic);
// router.get("/assets", getAssets);
// router.get("/asset", statisticAsset);
router.get("/general", generalStatistic);
router.get("/", ModuleStatisticHelper.Controller.getStatisticTypes);
router.get(`/user/:id`, userStatistic);

export default { router };
