import { Request, Response, NextFunction } from "express";
import prisma from "../prisma";

/* ================= CREATE USER ================= */

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = await prisma.user.create({
      data: { email, name }
    });

    res.status(201).json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


/* ================= GET ALL USERS ================= */

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


/* ================= GET USER BY ID ================= */
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      const error = new Error("User not found");
      (error as any).status = 404;
      throw error;
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};
/* ================= UPDATE USER ================= */
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      const error = new Error("User not found");
      (error as any).status = 404;
      throw error;
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name },
    });

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};


/* ================= DELETE USER ================= */
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      const error = new Error("User not found");
      (error as any).status = 404;
      throw error;
    }

    await prisma.user.delete({
      where: { id },
    });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};