import {Router} from "express";

import userRouter from "./userRouter.js";
import categoriaRouter from "./categoriaRouter.js";
import recursoRouter from "./recursoRouter.js";
import authRouter from "./authRouter.js";
import { isAuthenticated,isAdmin } from "../middlewares/authMiddleware.js";

const router  =  Router();

router.get("/",(req,res)=>{
    res.json({data:"hello api"});
})
router.use("/users",isAdmin,userRouter);
router.use("/categorias",isAuthenticated,categoriaRouter);
router.use("/recursos",isAuthenticated,recursoRouter);
router.use("/",authRouter);
export default router;