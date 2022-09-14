import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Collections } from "../../../../../../constant/collections";
import { BaseModel } from "../../../../base.model";
import { Category } from "../../category/category.model";

@modelOptions({
    schemaOptions: {
        collection: Collections.PRICE_PLUS_EMPLOYEE
    }
})

@index(
    { placeholder: 1 },
    {
        unique: true,
        background: true,
        name: "placeholder",
        partialFilterExpression: { isDeleted: { $eq: false } }
    }
)

export class Price extends BaseModel {
    @prop({
        required: true,
        trim: true,
    })
    placeholder: string;

    @prop({
        reuired: true
    })
    required: boolean

    @prop({
        required: true,
        type: Types.ObjectId,
        ref: Collections.CATEGORY
    })

    categoryId: Ref<Category>
}



export class PricePlus extends BaseModel {
    @prop({
        required: true,
        type: Types.ObjectId,
        ref: Collections.CATEGORY
    })

    categoryId: Ref<Category>

    @prop({
        required: true,
        type: () => Price
    })
    price: Price[];
}

export const PricePlusModel = getModelForClass(PricePlus)