import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Collections } from "../../../../constant/collections";
import { BaseModel } from "../../base.model";
import { Category } from "../../seller/product/category/category.model";
import { Seller } from "../../seller/seller.model";

@modelOptions({
    schemaOptions:{
        collection:Collections.SELLER_INTERESTED
    }
})


export class SellerIntrested extends BaseModel{
    @prop({
        required: true,
        unique: true,
        type: Types.ObjectId,
        ref: Collections.CATEGORY
    })
    categoryId: Ref<Category>

    @prop({
        required: true,
        unique: true,
        type: Types.ObjectId,
        ref: Collections.SELLER
    })
    sellerId: Ref<Seller>
}
export const SellerInterestedModel = getModelForClass(SellerIntrested)