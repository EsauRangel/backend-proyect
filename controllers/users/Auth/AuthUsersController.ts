import { Request, Response, response } from "express"
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { generateJWT } from "../../../helpers/jwt"
import { validateJWT } from '../../../middlewares/validate-jwt';
const prisma = new PrismaClient();

interface ReqBody extends Request {
    email: string
    password: string
}


export const create = async (req: Request, res: Response) => {
    const { email, password }: ReqBody = req.body;

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
        const token: any = await generateJWT(user.id, user.name);

        user = await prisma.user.update({
            where: {
                id: user.id
            },
            data: { password: hashPassword }
        });

        return res.json({
            success: true,
            user,
            token
        });


    } catch (error) {
        return res.status(500).json({
            msg: error
        });
    }
}



export const login = async (req: Request, res: Response) => {
    const { email, password }: ReqBody = req.body;

    try {
        const user = await prisma.user.findFirst({ where: { email: email } });

        if (!user) {
            return res.status(400).json({
                success: false,
                msg: "Usuario no existe."
            });
        }

        const encryptPassword: boolean = bcrypt.compareSync(password, user.password);
        if (!encryptPassword) {
            return res.status(400).json({
                success: false,
                msg: "Correo y/o contrasena incorrectos."
            });
        }

        const token = await generateJWT(user.id, user.name);

        return res.json({
            success: true,
            user,
            token,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error
        });
    }
}


interface ReqBodyRenew extends Request {
    id?: number,
    name?: string
}

export const renew = async (req: ReqBodyRenew, res: Response) => {

    const id = req.id;
    const name = req.name;
    let token: any;

    if (id && name) {
        token = await generateJWT(id, name);
    }

    return res.json({
        success: true,
        token
    })
}