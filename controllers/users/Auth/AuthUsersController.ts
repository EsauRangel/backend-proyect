import { request, response } from "express"
const bcrypt = require("bcryptjs");
import { PrismaClient } from "@prisma/client";
import {generateJWT} from "../../../helpers/jwt"
const prisma = new PrismaClient();

interface ReqBody {
    email: string,
    password: string
}
export const login = async (req = request, res = response) => {
    const { email, password }:ReqBody = req.body;

    try {
        let user = await prisma.user.findFirst({ where: { email: email } });

        if (user) {
            return res.status(400).json({
                error: {
                    msg: "Usuario ya existe."
                }
            });
        }

        user = await prisma.user.create({ data: req.body });
        //encriptar cpassword
        const salt: string = bcrypt.genSaltSync();
        const hashPassword: string = bcrypt.hashSync(password, salt);
        const token:any = await generateJWT(user.id, user.name);

        user = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {password: hashPassword}
        });

        return res.json({
            user,
            token
        });


    } catch (error) {
        return res.status(500).json({
            msg: error
        });
    }
}