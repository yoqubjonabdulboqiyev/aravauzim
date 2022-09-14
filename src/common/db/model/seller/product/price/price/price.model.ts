import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Collections } from "../../../../../../constant/collections";
import { BaseModel } from "../../../../base.model";
import { Product } from "../../product.model";

@modelOptions({
    schemaOptions: {
        collection: Collections.PRICE
    }
})

export class Price extends BaseModel {
    @prop({
        required: true,
        trim: true,
        type :Types.ObjectId,
        ref :Collections.PRODUCT
    })
    productId: Ref<Product>;

}

export const PriceModel = getModelForClass(Price)