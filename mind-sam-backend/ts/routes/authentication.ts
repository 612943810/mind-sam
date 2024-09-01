import { Router } from "express";
let authController=require('../controller/AuthenticationController')
export let authRoute=Router();
authRoute.post("/register",authController.registerUser);
authRoute.post("/login",authController.loginUser);
authRoute.get("/logout",authController.logoutUser);