import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Collections } from "../../../../../constant/collections";
import { Category } from "./category.model";

@modelOptions({
    schemaOptions: {
        collection:Collections.CATEGORY_REVIEW
    }
})


export class CategoryReview {
    @prop({
        default :0,
        required: true,
    })
    count: number;

    @prop({
        required:  true,
        trim : true,
        type: Types.ObjectId,
        ref: Collections.CATEGORY
    })
    categoryId : Ref<Category>
}

export const CategoryReviewModel = getModelForClass(CategoryReview)