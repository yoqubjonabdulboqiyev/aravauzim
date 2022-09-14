import express, { response } from "express";
import { BaseError } from "../common/baseError/base.error";
import { ENV } from "../common/config/config";
import { connectDB } from "../common/db/connection";

const app = express();

app.use(express.json())


async function start() {
    try {
        await connectDB();
        console.log(ENV.ADMIN_PORT)
        app.listen({ port: ENV.SELLER_PORT, host: ENV.HOST })
        console.log("seller server successfull")
        app.use((error: any, request: any, response: any, next: Function) => {
            if (error instanceof BaseError) {
                response.status(400).send(error)
            }
            else response.status(400).send(BaseError.UnknownError(error))
        })
    }
    catch (e) {
        console.log("seller server not successful", e)
    }
}

start();