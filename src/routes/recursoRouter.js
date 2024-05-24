import {Router} from "express";

import recursoApiController from "../controllers/recurso/recursoApiController.js";


const router  = Router();

router.get("/",recursoApiController.getAll);
router.get("/:id",recursoApiController.getById);
router.post("/",recursoApiController.create);
router.put("/:id",recursoApiController.update);
router.delete("/:id",recursoApiController.remove);
router.post("/:id/status",recursoApiController.changeStatus);
router.post("/:id/user",recursoApiController.addUser);
router.delete("/:id/user",recursoApiController.removeUser);

export default router;