import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
const prisma = new PrismaClient();


export const getCategories = async(req: Request, res: Response) => {
    const categories = await prisma.category.findMany();

    return res.json({
        success: "ok",
        categories
    })
}

export const saveCategory = async (req: Request, res: Response) => {
    const category = await prisma.category.create({data: req.body});

    return res.status(201).json({
        success: "ok",
        category
    });
    
}