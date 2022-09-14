import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Collections } from "../../../../../constant/collections";
import { BaseModel } from "../../../base.model";
import { Category } from "../category/category.model";

export enum type {
    SELECTION = "selection",
    STRING = "string",
    NUMBER = "number"
}

export class Value extends BaseModel {
    @prop({ required: true, trim: true })
    name: string
}

export class ValueType extends BaseModel {
    @prop({
        required: true,
        trim: true,
        enum: type
    })
    type: type

    @prop({
        required: true,
        trim: true,
    })
    placeholder: string

    @prop({
        required: true,
        trim: true
    })
    required: boolean

    @prop({
        trim: true,
        type: () => Value
    })
    name: Value[]
}

@modelOptions({
    schemaOptions: {
        collection: Collections.VALUE_TYPE
    }
})
export class TypeProduct extends BaseModel {
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
        type: () => ValueType
    })
    type: ValueType[];
}

export const TypeModel = getModelForClass(TypeProduct)