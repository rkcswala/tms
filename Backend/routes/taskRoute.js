
import express from "express";

import { createTask, handelgettask,handelupdate, handeldelete  } from "../controller/taskcontroller.js";

const router = express.Router();

router.post("/create", createTask);
router.get("/gettasks", handelgettask);
router.put("/update/:id", handelupdate)
router.delete("/delete/:id", handeldelete)


export default router;