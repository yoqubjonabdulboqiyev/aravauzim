import express, { response } from "express";
import { BaseError } from "../common/baseError/base.error";
import { ENV } from "../common/config/config";
import { connectDB } from "../common/db/connection";


import employeeRouter from "../admin/router/admin/employee.route"
import roleRouter from "../admin/router/admin/role.route"
import categoryRouter from "../admin/router/seller/product/category/category.route"
import typeRouter from "../admin/router/seller/product/type/type.router"
import regionRouter from "../admin/router/region/region.route"
import sellerRouter from "../admin/router/seller/seller.route"
import plusPriceRouter  from "../admin/router/seller/product/price/price plus admin/price.route"
import plusPriceSellerRouter from "../admin/router/seller/product/price/price plus seller/price.route"
import sellerCommentRouter from "../admin/router/seller/comment/comment.router"
import mesuareRouter from "../admin/router/seller/product/measure/measure.router"
import productRouter from "../admin/router/seller/product/product.router"
const app = express();
app.use(express.json());


app.use("/employee", employeeRouter)
app.use("/role", roleRouter)
app.use("/category",categoryRouter)
app.use("/type", typeRouter)
app.use("/region", regionRouter)
app.use("/seller",sellerRouter )
app.use("/sellerComment", sellerCommentRouter)
app.use("/plusPrice", plusPriceRouter)
app.use("/productPrice", plusPriceSellerRouter)
app.use("/measure", mesuareRouter)
app.use("/product", productRouter)


async function start() {
    try {
        await connectDB();
        console.log(ENV.ADMIN_PORT)
        app.listen({ port: ENV.ADMIN_PORT, host: ENV.HOST })
        console.log("seller server successfull")
        app.use((error: any, request: any, response: any, next: Function) => {
            if (error instanceof BaseError) {
                response.status(400).send(error)
            }
            else response.status(400).send(BaseError.UnknownError(error))
        })
    }
    catch (e) {
        console.log("admin server not successful", e)
    }
}

start();