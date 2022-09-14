

import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { Collections } from "../../../constant/collections";
import { BaseModel } from "../base.model";

export enum Status {
    TEPADA= "tepda",
    PASDA = "pasta",
}

@modelOptions({
    schemaOptions:{
        collection : Collections.BANNER
    }
})

export class Banner extends BaseModel {
    
    @prop({
        trim: true
    })
    imgUrl ?: string;

    @prop({
        required: true,
        trim: true
    })
    comment: string;

    @prop({
        required: true,
        trim: true
    })
    lifetime: string;

    @prop({
        required: true,
        trim: true,
        enum : Status
    })
    status: Status;
}

export const BannerModel = getModelForClass(Banner)   