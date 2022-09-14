import { prop,  modelOptions, getModelForClass } from "@typegoose/typegoose";
import { Collections } from "../../../constant/collections";
import { BaseModel } from "../base.model";

@modelOptions({
    schemaOptions: {
        collection: Collections.REGION
    }
})
export class Region extends BaseModel{
    @prop({
        required: true,
        trim: true
    })
    name:string;
}

export const RegionModel = getModelForClass(Region)