import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Collections } from "../../../constant/collections";
import { Gender } from "../../../constant/enum";
import { BaseModel } from "../base.model";
import { Region } from "../region/region.model";

export enum Status {
    ACTIVE = "active",
    NO_ACTIVE = "noActive",
    BLOC = "blog",
    KUTILYOTGAN = "kutilyotgan"
}

@modelOptions({
    schemaOptions: {
        collection: Collections.SELLER
    }
})


@index(
    { phoneNumber: 1 },
    {
        unique: true,
        background: true,
        name: "phoneNumber",
        partialFilterExpression: { isDeleted: { $eq: false } }
    }
)

export class Seller extends BaseModel {
    @prop({
        required: true,
        trim: true
    })
    firstName: string;

    @prop({
        required: true,
        trim: true
    })
    lastName: string;

    @prop({
        trim: true,
        required: true
    })
    phoneNumber: string;

    @prop({
        required: true,
        trim: true,
        min: 4,
        max: 20
    })
    password: string;

    @prop({
        required: true,
        trim: true,
        enum: Gender
    })
    gender: Gender

    @prop({
        required: true,
        trim: true,
        type: Types.ObjectId,
        ref: Collections.REGION
    })
    addressId: Ref<Region>;

    @prop({
        default: null,
        trim: true
    })
    telegrammUserName?: string

    @prop({
        default: null,
        trim: true
    })
    imgUrl?: string;

    @prop({
        default: Status.KUTILYOTGAN,
        trim: true,
        enum: Status
    })
    status: Status
}

export const SellerModel = getModelForClass(Seller)