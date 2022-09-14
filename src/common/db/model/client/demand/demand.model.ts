import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Collections } from "../../../../constant/collections";
import { Active } from "../../../../constant/enum";
import { BaseModel } from "../../base.model";
import { Category } from "../../seller/product/category/category.model";
import { Measure } from "../../seller/product/measure/measure.model";


@modelOptions({
    schemaOptions: {
        collection: Collections.DEMAND
    }
})

export class Demand extends BaseModel {
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
        trim: true
    })
    description?: string

    @prop({
        required: true,
        trim: true,
        min: 0
    })
    narx: number
    @prop({
        required: true,
        trim: true,
        type: Types.ObjectId,
        ref: Collections.MEASURE
    })
    measureId: Ref<Measure>

    @prop({
        required: true,
        default: 0,
        min: 0
    })
    count: number

    @prop({
        required : true,
        trim: true
    })
    muddat: string;
    @prop({
        default: Active.NO_ACTIVE,
        trim : true,
        enum : Active
    })
    active : Active 

}

export const DemandModel = getModelForClass(Demand)