import { ModelType } from "@typegoose/typegoose/lib/types";
import { Collections } from "../../../../constant/collections";
import { CategoryReview, CategoryReviewModel } from "../../../../db/model/seller/product/category/review.model";
import { BaseServise } from "../../../base.service";



export class CategoryReviewService extends BaseServise<CategoryReview>{
    constructor(model: ModelType<CategoryReview>) {
        super(model)
    }
    public async topCategories() {
        const $match = {
            $match: {
                step: 2
            }
        }
        const $sort = {
            $sort: {
                count: -1
            }
        }

        const $lookup = {
            $lookup : {
                from : Collections.CATEGORY,
                localField : "categoryId",
                foriegnField : "_id",
                as : "category"
            }
        }
        const $unwind = {
            unwind : {
                path : "$category",
                preserveNullAndEmptyArrays: true,
            }
        }

        const $project = {
            $project: {
                _id :0,
                __v : 0,
                isDeleted : 0,
                categoryId:0,
                category : {
                    __v :0,
                    isDeleted : 0,
                }
            }
        }

        const $pipeline = [$match, $lookup, $unwind,$sort, $project]
        const topCategories = await this.aggregate($pipeline)
        return topCategories
    }

}

export const categoryReviewServise = new CategoryReviewService(CategoryReviewModel)