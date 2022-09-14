import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Collections } from "../../../../constant/collections";
import { BaseModel } from "../../base.model";
import { Client } from "../../client/client.model";
import { Category } from "../../seller/product/category/category.model";

@modelOptions({
    schemaOptions:{
        collection:Collections.CLIENT_INTERESTED
    }
})


export class ClientIntrested extends BaseModel{
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
        ref: Collections.CLIENT
    })
    clientId: Ref<Client    >
}
export const ClientInterestedModel = getModelForClass(ClientIntrested)