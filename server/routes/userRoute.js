import { Router } from "express";
import { register } from "../controller/userController.js";

const router = Router()

// routes
router.post('/register',register)

export default router