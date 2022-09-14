import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Collections } from "../../../constant/collections";
import { Active, Gender } from "../../../constant/enum";
import { Role } from "../admin/role/role.model";
import { BaseModel } from "../base.model";
import { Category } from "../seller/product/category/category.model";

@modelOptions({
    schemaOptions: {
        collection: Collections.CLIENT
    }
})


@index(
    { phoneNumber: 1 },
    {
        unique: true,
        background: true,
        name: "userName",
        partialFilterExpression: { isDeleted: { $eq: false } }
    }
)

export class Client extends BaseModel {
    @prop({ trim: true })
    firstName: string;

    @prop({ trim: true })
    lastName: string;

    @prop({ trim: true })
    phoneNumber: string;

    @prop({ required: true, trim: true })
    password: string;

    @prop({
        required: true,
        trim: true,
        enum: Gender
    })
    gender: Gender

    @prop({
        default: Active.ACTIVE,
        trim: true,
        enum: Active
    })
    active: Active


    @prop({
        required: true,
        trim: true,
        type: Types.ObjectId,
        ref: Collections.CATEGORY
    })
    intrested: Ref<Category>[]

    @prop({
        trim :true,
        default : null
    })
    telegrammUserName?: string;


}

export const ClientModel = getModelForClass(Client)