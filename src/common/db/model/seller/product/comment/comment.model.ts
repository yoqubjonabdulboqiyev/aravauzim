import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Collections } from "../../../../../constant/collections";
import { BaseModel } from "../../../base.model";
import { Client } from "../../../client/client.model";
import { Product } from "../product.model";

@modelOptions({
    schemaOptions: {
        collection:Collections.PRODUCT_COMMENT
    }
})


export class ProductComment extends BaseModel {
    @prop({
        required: true,
        min: 1,
        max: 5
    })
    rating: number;

    @prop({
        default : null,
        trim: true,
        required : true
    })
    comment: string
    
    @prop({
        required:  true,
        trim : true,
        type: Types.ObjectId,
        ref: Collections.PRODUCT
    })
    productId : Ref<Product>

    @prop({
        required:  true,
        trim : true,
        type: Types.ObjectId,
        ref: Collections.CATEGORY
    })
    clientId : Ref<Client>
}

export const ProductCommentModel = getModelForClass(ProductComment)