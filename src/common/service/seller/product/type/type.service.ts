import { ModelType } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";
import { Collections } from "../../../../constant/collections";
import { TypeError } from "../../../../db/model/seller/product/type/type.error";
import { TypeModel, TypeProduct } from "../../../../db/model/seller/product/type/type.model";
import { PagingDto } from "../../../../validation/dto/paging.dto";
import { BaseServise } from "../../../base.service";


export class TypeService extends BaseServise<TypeProduct>{
    constructor(model: ModelType<TypeProduct>) {
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
                isDeleted: 0,
                __v: 0,
                type: {
                    isDeleted: 0,
                    __v: 0,
                    name: {
                        isDeleted: 0,
                        __v: 0,
                    }
                }
            }
        }
        const $pipeline = [$match, $project]
        const Type = await (await this.aggregate($pipeline)).shift()
        if (!Type) throw TypeError.NotFound(id)
        return Type
    }

    public async productTypeValue(id) {
        const $match = {
            $match: {
                isDeleted: false,
                "type.name._id": new Types.ObjectId(id)
            }
        }

        const $project = {
            $project: {
                isDeleted: 0,
                __v: 0,
                type: {
                    isDeleted: 0,
                    __v: 0,
                    name: {
                        isDeleted: 0,
                        __V: 0,
                    }
                }
            }
        }

        const $pipeline = [$match, $project]
        const field = await (await this.aggregate($pipeline)).shift()
        if (!field) {
            throw TypeError.NotFound(id)
        }

        let placeholder
        for (let item of field.type) {
            for (let name of item.name) {
                if (name._id == id) {
                    placeholder = name
                }
            }
        }
        return placeholder
    }

    public async productTypeField(id) {
        const $match = {
            $match: {
                isDeleted: false,
                "type._id": new Types.ObjectId(id)
            }
        }

        const $project = {
            $project: {
                isDeleted: 0,
                __v: 0,
                type: {
                    isDeleted: 0,
                    __v: 0
                }
            }
        }

        const $pipeline = [$match, $project]
        const field = await (await this.aggregate($pipeline)).shift()
        if (!field) {
            throw TypeError.NotFound(id)
        }

        let placeholder
        for (let item of field.type) {
            if (item._id == id) {
                placeholder = item
            }
        }
        return placeholder
    }

    public async createType(data) {
        try {
            const Type = await this.create(data)
            return await this.findByIdError(Type._id)
        }
        catch (e) {
            if (e.code == 11000) throw TypeError.AlreadyExists(data)
            return e
        }
    }

    public async updateProductType(id, data) {
        try {
            await this.findByIdError(id)
            const productType = await this.updateOne(id, data)
            return await this.findByIdError(productType._id)
        }
        catch (e) {
            if (e.code == 11000) throw TypeError.AlreadyExists(data)
            return e
        }
    }

    public async deleteProductType(id) {
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
                type: {
                    name: {
                        isDeleted: 0
                    },
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



export const typeService = new TypeService(TypeModel)