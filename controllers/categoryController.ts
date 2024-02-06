import { PrismaClient } from "@prisma/client"
import { request, response } from "express"
const prisma = new PrismaClient();


export const getCategories = async(req = request, res = response) => {
    const categories = await prisma.category.findMany();

    return res.json({
        success: "ok",
        categories
    })
}

export const saveCategory = async (req = request, res = response) => {
    const category = await prisma.category.create({data: req.body});

    return res.status(201).json({
        success: "ok",
        category
    })
}