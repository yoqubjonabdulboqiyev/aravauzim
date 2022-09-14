import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Collections } from "../../../../constant/collections";
import { Active } from "../../../../constant/enum";
import { BaseModel } from "../../base.model";
import { Category } from "./category/category.model";
import { Measure } from "./measure/measure.model";
import { Seller } from "../seller.model";

@modelOptions({
    schemaOptions: {
        collection: Collections.PRODUCT
    }
})

export class Product extends BaseModel {
    @prop({
        trim: true
    })
    imgUrl?: string;

    @prop({
        required: true,
        trim: true
    })
    name: string;

    @prop({
        required: true,
        trim: true,
        type: Types.ObjectId,
        ref: Collections.CATEGORY
    })
    categoryId: Ref<Category>

    @prop({
        required: true,
        trim: true,
        type: Types.ObjectId,
        ref: Collections.MEASURE
    })
    measureId: Ref<Measure>

    @prop({
        required: true,
        trim: true,
        type: Types.ObjectId,
        ref: Collections.SELLER
    })
    sellerId: Ref<Seller>
    @prop({
        trim: true
    })
    description?: string
    @prop({
        default: Active.NO_ACTIVE,
        trim: true,
        enum: Active
    })
    active: Active
}

export const ProductModel = getModelForClass(Product)