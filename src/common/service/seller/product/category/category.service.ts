import { ModelType } from "@typegoose/typegoose/lib/types"
import { Types } from "mongoose"
import { Collections } from "../../../../constant/collections"
import { Category, CategoryModel } from "../../../../db/model/seller/product/category/category.model"
import { CategoryError } from "../../../../db/model/seller/product/category/error"
import { PagingDto } from "../../../../validation/dto/paging.dto"
import { BaseServise } from "../../../base.service"



export class CategoryService extends BaseServise<Category>{
    constructor(model: ModelType<Category>) {
        super(model)
    }

    public async findByIdError(id) {

        const $match = {
            $match: {
                isDeleted: false,
                _id: new Types.ObjectId(id)
            }
        }

        const $lookupParent = {
            $lookup: {
                from: Collections.CATEGORY,
                localField: "parentId",
                foreignField: "_id",
                as: "parentCategory"
            }
        }
        const $unwindParent = {
            $unwind: {
                path: "$parentCategory",
                preserveNullAndEmptyArrays: true,
            },
        };

        const $project = {
            $project: {
                _id: 1,
                name: 1,
                parentCategory: {
                    _id: 1,
                    name: 1,
                    step: 1,
                },
                step: 1,
                createdAt: 1,
                updatedAt: 1
            }
        }

        const $pipeline = [$match, $lookupParent, $unwindParent, $project]
        const category = await (await this.aggregate($pipeline)).shift()
        if (!category) throw CategoryError.NotFound(id)
        return category
    }

    public async createCategory(data) {
        try {
            const category = await this.create(data)
            return await this.findByIdError(category._id)
        }
        catch (e) {
            if (e.code == 11000) throw CategoryError.AlreadyExists(data)
            return e
        }
    }

    public async updateCategory(id, data) {
        try {
            await this.findByIdError(id)
            const category = await this.updateOne(id, data)
            return await this.findByIdError(category._id)
        }
        catch (e) {
            if (e.code == 11000) throw CategoryError.AlreadyExists(data)
            return e
        }
    }

    public async deleteCategory(id) {
        await this.findByIdError(id)
        const deleted = await this.deleteOne(id)
        return deleted._id
    }

    public async getPaging<T>(dto: PagingDto) {
        let query: any = { isDeleted: false }
        const $match = {
            $match: {
                step: 1
            }
        }
        const $lookupParent = {
            $lookup: {
                from: Collections.CATEGORY,
                localField: "parentId",
                foreignField: "_id",
                as: "parentCategory"
            }
        }
        const $unwindParent = {
            $unwind: {
                path: "$parentCategory",
                preserveNullAndEmptyArrays: true,
            },
        };

        const $project = {
            $project: {
                name: 1,
                parentCategory: {
                    name: 1,
                    step: 1,
                },
                step: 1,
                createdAt: 1,
                updatedAt: 1
            }
        }

        const $pipeline = [$match, $lookupParent, $unwindParent, $project]
        return await this.findPaging(query, dto, $pipeline)
    }

    public async getPagingSubCategory<T>(dto: PagingDto, id) {
        let query: any = { isDeleted: false }
        const $match = {
            $match: {
                parentId: new Types.ObjectId(id)
            }
        }
        const $lookupParent = {
            $lookup: {
                from: Collections.CATEGORY,
                localField: "parentId",
                foreignField: "_id",
                as: "parentCategory"
            }
        }
        const $unwindParent = {
            $unwind: {
                path: "$parentCategory",
                preserveNullAndEmptyArrays: true,
            },
        };

        const $project = {
            $project: {
                name: 1,
                parentCategory: {
                    name: 1,
                    step: 1,
                },
                step: 1,
                createdAt: 1,
                updatedAt: 1
            }
        }

        const $pipeline = [$match, $lookupParent, $unwindParent, $project]
        return await this.findPaging(query, dto, $pipeline)
    }

    public async Count() {
        const $match = {
            $match: {
                isDeleted: false,
                step: 2
            }
        }
        const count = await categoryService.aggregate([$match])
        return count.length
    }



}

export const categoryService = new CategoryService(CategoryModel)