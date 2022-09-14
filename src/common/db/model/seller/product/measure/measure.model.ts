import { getModelForClass, Index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Collections } from "../../../../../constant/collections";
import { BaseModel } from "../../../base.model";
import { Category } from "../category/category.model";

@modelOptions({
    schemaOptions: {
        collection: Collections.MEASURE
    }
})
@Index(
    {
        name:1,
    }, {
    unique: true,
    background : true,
    name:"name",
    partialFilterExpression : {isDeleted : {$eq:false}}
}
)

export class Measure extends BaseModel{
    @prop({
        required : true,
        trim : true
    })
    name : string

    @prop({
        required : true,
        trim : true
    })
    fullName : string

    @prop({
        required: true,
        trim: true,
        type: Types.ObjectId,
        ref: Collections.CATEGORY
    })
    categoryId: Ref<Category>
}

export const MeasureModel = getModelForClass(Measure)