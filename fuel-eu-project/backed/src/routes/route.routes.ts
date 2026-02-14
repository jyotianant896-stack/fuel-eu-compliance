import { Router } from "express";
import {
  createRoute,
  getAllRoutes,
  getRouteById,
  updateRoute,
  deleteRoute,
  getBankedRoutes,
  getTotalCompliance,
  getPooledCompliance,
  compareRoutes      // ✅ ADD THIS LINE
} from "../controllers/route.controller";


const router = Router();  // ✅ FIRST create router

// Routes
router.post("/", createRoute);
router.get("/", getAllRoutes);
router.get("/bank", getBankedRoutes);
router.get("/pool", getPooledCompliance);
router.get("/pool/total", getTotalCompliance);

// ✅ ADD HERE
router.get("/compare/:id1/:id2", compareRoutes);

router.get("/:id", getRouteById);
router.put("/:id", updateRoute);
router.delete("/:id", deleteRoute);

export default router;