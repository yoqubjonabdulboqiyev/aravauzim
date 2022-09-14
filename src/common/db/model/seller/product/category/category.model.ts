
import { getModelForClass, Index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Collections } from "../../../../../constant/collections";
import { BaseModel } from "../../../base.model";

@modelOptions({
    schemaOptions: {
        collection: Collections.CATEGORY
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

export class Category extends BaseModel {
    @prop({ required: true, trim: true })
    name : string;

    @prop({default : null, type : Types.ObjectId, ref : Collections.CATEGORY})
    parentId:Ref<Category>

    @prop({min : 1, max: 2})
    step : number;
}

export const CategoryModel = getModelForClass(Category)