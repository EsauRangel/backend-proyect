import {  Request, Response, NextFunction } from "express"
import jwt, { JwtPayload }  from 'jsonwebtoken';


interface DecodedToken extends JwtPayload {
    id: string;
    name: string;
}

export const validateJWT = (req: Request, res: Response, next: NextFunction) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            success: false,
            msg: "Unauthorized."
        });
    }

    try{

        const user = jwt.verify(token, process.env.SECRET_JWT_SEED || "") as DecodedToken
        (req as any).id = user.id;
        (req as any).name = user.name;

        next();
    }catch(error){
        return res.status(500).json({
            ok:false,
            msg: "Token no valido."
        });
    }
}
