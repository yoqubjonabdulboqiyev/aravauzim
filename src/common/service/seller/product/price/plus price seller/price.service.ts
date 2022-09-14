import { ModelType } from "@typegoose/typegoose/lib/types"
import { Types } from "mongoose"
import { Collections } from "../../../../../constant/collections"
import { PricePlusError } from "../../../../../db/model/seller/product/price/plus price admin/price.error"
import { PricePlusSellerError } from "../../../../../db/model/seller/product/price/plus prise seller/price.error"
import { PricePlusSeller, PricePlusSellerModel } from "../../../../../db/model/seller/product/price/plus prise seller/price.model"
import { PagingDto } from "../../../../../validation/dto/paging.dto"
import { BaseServise } from "../../../../base.service"
import { pricePlusService } from "../plus price admin/price.service"





export class PricePlusSellerService extends BaseServise<PricePlusSeller>{
    constructor(model: ModelType<PricePlusSeller>) {
        super(model)
    }

    public async findByIdError(id) {

        const $match = {
            $match: {
                isDeleted: false,
                _id: new Types.ObjectId(id)
            }
        }

        const $project = {
            $project: {
                price: 1,
                categoryId: 1,
                productId: 1,
                createdAt: 1,
                updatedAt: 1
            }
        }

        const $pipeline = [$match, $project]
        const PricePlusSeller = await this.aggregate($pipeline)
        if (!PricePlusSeller) throw PricePlusSellerError.NotFound(id)
        return PricePlusSeller
    }

    public async createPricePlusSeller(data) {
        try {
            const price = await (await pricePlusService.findByIdError(data.priceId)).shift();
            console.log(price)
            console.log(data)
            console.log("price ::: ", price.price)
            console.log("data ::: ",data.price)
            if (!price) {
                throw PricePlusError.NotFound(data.priceId)
            }
            for (let item of price.price) {
                if (item.required == true) {
                    let count = 0;
                    for (let items of data.price) {
                        if (item._id == items._id) {
                            count += 1
                        }
                    }
                    if (count == 0) {
                        throw PricePlusSellerError.NotRequired(item)
                    }
                }

            }
            console.log("salom")
            const createPrice = await this.create(data)
            return await this.findByIdError(createPrice._id)
        }
        catch (e) {
            if (e.code == 11000) throw PricePlusSellerError.AlreadyExists(data)
            return e
        }
    }

    public async updatePricePlusSeller(id, data) {
        try {
            await this.findByIdError(id)
            const PricePlusSeller = await this.updateOne(id, data)
            return await this.findByIdError(PricePlusSeller._id)
        }
        catch (e) {
            if (e.code == 11000) throw PricePlusSellerError.AlreadyExists(data)
            return e
        }
    }

    public async deletePricePlusSeller(id) {
        await this.findByIdError(id)
        const deleted = await this.deleteOne(id)
        return deleted._id
    }

    public async getPaging<T>(dto: PagingDto, id) {
        let query: any = { isDeleted: false }
        const $match = {
            $match: {
                isDeleted: false,
                categoryId: new Types.ObjectId(id),
            }
        }
        const $project = {
            $project: {
                price: 1,
                categoryId: 1,
                productId: 1,
                createdAt: 1,
                updatedAt: 1
            }
        }

        const $pipeline = [$match, $project]
        return await this.findPaging(query, dto, $pipeline)
    }

}

export const pricePlusSellerService = new PricePlusSellerService(PricePlusSellerModel)