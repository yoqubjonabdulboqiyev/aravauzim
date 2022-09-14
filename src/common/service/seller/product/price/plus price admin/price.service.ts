import { ModelType } from "@typegoose/typegoose/lib/types"
import { Types } from "mongoose"
import { Collections } from "../../../../../constant/collections"
import { PricePlusError } from "../../../../../db/model/seller/product/price/plus price admin/price.error"
import { PricePlus, PricePlusModel } from "../../../../../db/model/seller/product/price/plus price admin/price.model"
import { PagingDto } from "../../../../../validation/dto/paging.dto"
import { BaseServise } from "../../../../base.service"




export class PricePlusService extends BaseServise<PricePlus>{
    constructor(model: ModelType<PricePlus>) {
        super(model)
    }

    public async findByIdError(id) {

        const $match = {
            $match: {
                isDeleted: false,
                _id: new Types.ObjectId(id)
            }
        }
        const $lookupCategory = {
            $lookup: {
                from: Collections.CATEGORY,
                localField: "categoryId",
                foreignField: "_id",
                as: "category"
            }
        }
        const $unwindCategory = {
            $unwind: {
                path: "$category",
                preserveNullAndEmptyArrays: true,
            },
        };

        const $project = {
            $project: {
                isDeleted: 0,
                price: {
                    isDeleted: 0
                },
                category: {
                    isDeleted: 0
                },
            }
        }

        const $pipeline = [$match, $lookupCategory, $unwindCategory, $project]
        const PricePlus = await this.aggregate($pipeline)
        if (!PricePlus) throw PricePlusError.NotFound(id)
        return PricePlus
    }

    public async createPricePlus(data) {
        try {
            const PricePlus = await this.create(data)
            return await this.findByIdError(PricePlus._id)
        }
        catch (e) {
            if (e.code == 11000) throw PricePlusError.AlreadyExists(data)
            return e
        }
    }

    public async placeholder(id) {
        const $match = {
            $match: {
                isDeleted: false,
                "price._id": new Types.ObjectId(id)
            }
        }

        const $project = {
            $project: {
                price: {
                    isDeleted: 0,
                    __v: 0
                }
            }
        }

        const $pipeline = [$match, $project]
        const PricePlus = await (await this.aggregate($pipeline)).shift()
        if(!PricePlus){
            throw PricePlusError.NotFound(id)
        }
        
        let placeholder
        for (let item of PricePlus.price) {
            if (item._id == id) {
                placeholder = item
            }
        }
        return placeholder
    }

    public async updatePricePlus(id, data) {
        try {
            await this.findByIdError(id)
            const PricePlus = await this.updateOne(id, data)
            return await this.findByIdError(PricePlus._id)
        }
        catch (e) {
            if (e.code == 11000) throw PricePlusError.AlreadyExists(data)
            return e
        }
    }

    public async deletePricePlus(id) {
        await this.findByIdError(id)
        const deleted = await this.deleteOne(id)
        return deleted._id
    }

    public async getPaging<T>(dto: PagingDto, id) {
        let query: any = { isDeleted: false }
        const $match = {
            $match: {
                isDeleted: false,
                categoryId: new Types.ObjectId(id)
            }
        }
        const $lookupCategory = {
            $lookup: {
                from: Collections.CATEGORY,
                localField: "categoryId",
                foreignField: "_id",
                as: "category"
            }
        }
        const $unwindCategory = {
            $unwind: {
                path: "$category",
                preserveNullAndEmptyArrays: true,
            },
        };

        const $project = {
            $project: {
                isDeleted: 0,
                price: {
                    isDeleted: 0
                },
                category: {
                    isDeleted: 0
                },
            }
        }

        const $pipeline = [$match, $lookupCategory, $unwindCategory, $project]
        return await this.findPaging(query, dto, $pipeline)
    }

}

export const pricePlusService = new PricePlusService(PricePlusModel)