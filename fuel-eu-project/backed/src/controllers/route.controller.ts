import { Request, Response } from "express";
import prisma from "../prisma";

/* ===============================
   CREATE ROUTE
================================= */
export const createRoute = async (req: Request, res: Response) => {
  try {
    const { name, fuelConsumption, emission, targetEmission } = req.body;

    const complianceBalance = targetEmission - emission;

    const route = await prisma.route.create({
      data: {
        name,
        fuelConsumption,
        emission,
        targetEmission,
        complianceBalance,
      },
    });

    res.status(201).json(route);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* ===============================
   GET ALL ROUTES
================================= */
export const getAllRoutes = async (req: Request, res: Response) => {
  try {
    const routes = await prisma.route.findMany();
    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* ===============================
   GET ROUTE BY ID
================================= */
export const getRouteById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const route = await prisma.route.findUnique({
      where: { id },
    });

    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }

    res.json(route);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* ===============================
   UPDATE ROUTE
================================= */
export const updateRoute = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, fuelConsumption, emission, targetEmission } = req.body;

    const complianceBalance = targetEmission - emission;

    const updatedRoute = await prisma.route.update({
      where: { id },
      data: {
        name,
        fuelConsumption,
        emission,
        targetEmission,
        complianceBalance,
      },
    });

    res.json(updatedRoute);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* ===============================
   DELETE ROUTE
================================= */
export const deleteRoute = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await prisma.route.delete({
      where: { id },
    });

    res.json({ message: "Route deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Banking logic//
export const getBankedRoutes = async (req: Request, res: Response) => {
  try {
    const routes = await prisma.route.findMany({
      where: {
        complianceBalance: {
          gt: 0, // greater than 0
        },
      },
    });

    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//pooling logic//
export const getTotalCompliance = async (req: Request, res: Response) => {
  try {
    const result = await prisma.route.aggregate({
      _sum: {
        complianceBalance: true,
      },
    });

    res.json({
      totalComplianceBalance: result._sum.complianceBalance || 0,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
/////
export const getPooledCompliance = async (req: Request, res: Response) => {
  try {
    const routes = await prisma.route.findMany();

    const totalCompliance = routes.reduce((sum, route) => {
      return sum + (route.complianceBalance || 0);
    }, 0);

    res.json({
      totalRoutes: routes.length,
      totalComplianceBalance: totalCompliance,
      status: totalCompliance >= 0 ? "COMPLIANT" : "DEFICIT"
    });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
///////
export const compareRoutes = async (req: Request, res: Response) => {
  try {
    const { id1, id2 } = req.params;

    const route1 = await prisma.route.findUnique({
      where: { id: Number(id1) },
    });

    const route2 = await prisma.route.findUnique({
      where: { id: Number(id2) },
    });

    if (!route1 || !route2) {
      return res.status(404).json({ message: "One or both routes not found" });
    }

    let betterRoute;

    if ((route1.complianceBalance || 0) > (route2.complianceBalance || 0)) {
      betterRoute = route1.name;
    } else if ((route1.complianceBalance || 0) < (route2.complianceBalance || 0)) {
      betterRoute = route2.name;
    } else {
      betterRoute = "Both routes have equal compliance";
    }

    res.json({
      route1: route1.name,
      route2: route2.name,
      betterRoute,
    });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};