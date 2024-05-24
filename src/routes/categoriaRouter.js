import {Router} from "express";

import categoriaApiController from "../controllers/categorias/categoriaApiController.js";

import { isAuthenticated,isAdmin } from "../middlewares/authMiddleware.js";

const router  = Router();

router.get("/",categoriaApiController.getAll);
router.get("/:id",categoriaApiController.getById);
router.post("/",isAdmin,categoriaApiController.create);
router.put("/:id",isAdmin,categoriaApiController.update);
router.delete("/:id",isAdmin,categoriaApiController.remove);
router.post("/:id/user",isAdmin,categoriaApiController.addUser);
router.delete("/:id/user",isAdmin,categoriaApiController.removeUser);

export default router;