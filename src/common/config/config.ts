import dotenv from "dotenv";
import path from "path";

dotenv.config()
const { env } = process

export const ENV = {
    DB_URL : env.DB_URL,
    HOST : env.HOST,
    ADMIN_PORT : Number(env.ADMIN_PORT),
    SELLER_PORT : Number(env.SELLER_PORT),
    TOKEN_KEY : env.TOKEN_KEY,
    TOKEN_TIME : {
        expiresIn : env.TOKEN_TIME
    }
}

