import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Collections } from "../../../../../../constant/collections";
import { BaseModel } from "../../../../base.model";
import { Category } from "../../category/category.model";
import { Product } from "../../product.model";
import { PricePlus } from "../plus price admin/price.model";


export enum Status {
    KORSATILSIN = "korsatilsin",
    KORSATILMASIN = "korsatilmasin"
}

export class Price extends BaseModel {
    @prop({
        default: Status.KORSATILSIN,
        trim: true
    })
    status: Status
}


@modelOptions({
    schemaOptions: {
        collection: Collections.PRICE_PLUS_SELLER
    }
})


export class PricePlusSeller extends BaseModel {
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
        ref: Collections.CATEGORY
    })
    priceId: Ref<Category>

    @prop({
        required: true,
        trim: true,
        type: Types.ObjectId,
        ref: Collections.PRODUCT
    })
    productId: Ref<Product>

    @prop({
        required: true,
        trim: true,
        type: () => Price
    })
    price: Price[];
}

export const PricePlusSellerModel = getModelForClass(PricePlusSeller)