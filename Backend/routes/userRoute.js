import express from "express";
import { handelusersignup, handeluserlogin, handelgetuser } from "../controller/userController.js";

const router = express.Router();

router.post("/", handelusersignup);
router.post("/login", handeluserlogin);
router.get("/getusers", handelgetuser)

export default router;