import { Router } from "express";
let authController=require('../controller/AuthenticationController')
export let authRoute=Router();
authRoute.post("/register",authController.registerUser);
authRoute.get("/login",authController.loginUser);