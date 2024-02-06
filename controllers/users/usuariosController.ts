import { PrismaClient } from '@prisma/client'
import { request, response } from 'express'
const prisma = new PrismaClient();

interface ReqParams {
    per_page?: string,
    page?: string,
    q?: string
}

export const getUsers = async (req = request, res = response) => {

    try {
        const { per_page = '5', page = '1', q = '' }: ReqParams = req.query;
        //Pagination
        const take = parseInt(per_page, 10);
        const pageNumber = parseInt(page, 10)
        const skip = (take * pageNumber - take);


        let users = null;

        users = await prisma.user.findMany({
            skip, take,
            where: {
                OR: [
                    {
                        name: {
                            contains: q,
                        },
                        email: {
                            contains: q,
                        },
                    }
                ]
            },
        })


        if (users) {
            return res.json({
                success: "ok",
                users
            });
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Courrio un error." + error
        });
    }
}

export const saveUsers = async (req = request, res = response) => {
    
    try {

        const user = await prisma.user.create({ data: req.body });

        return res.json({
            success: "ok",
            user
        });


    } catch (error) {
        console.log(error)
    }
}