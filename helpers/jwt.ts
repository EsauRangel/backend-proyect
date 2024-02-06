import jwt from "jsonwebtoken";

export const generateJWT = (id: number, name: string) => {

    return new Promise((resolve, reject) => {
        const payload: {} = { id, name };

        jwt.sign(payload, process.env.SECRET_JWT_SEED || "", {
            expiresIn: '24h'
        }, (error: Error | null, token: string | undefined) => {

            if (error) {
                console.log("first");
                reject("Nose pudo cargar.");
            }

            resolve(token);
        })
    });
}

module.exports = {
    generateJWT
}