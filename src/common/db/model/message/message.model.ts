import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { Collections } from "../../../constant/collections";
import { BaseModel } from "../base.model";

export enum Status {
    EMPLOYEE = "employee",
    SELLER = "seller",
    CLIENT = "client",
    ALL = "all"
}

@modelOptions({
    schemaOptions:{
        collection : Collections.MESSAGE
    }
})

export class Message extends BaseModel {

    @prop({
        trim: true
    })
    imgUrl?: string;

    @prop({
        required: true,
        trim: true
    })
    message: string;

    @prop({
        required: true,
        trim: true,
        enum : Status
    })
    to: Status;
}

export const MessageModel = getModelForClass(Message)