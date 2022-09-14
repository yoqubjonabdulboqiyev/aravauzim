import { getModelForClass, index, modelOptions, prop } from "@typegoose/typegoose";
import { Collections } from "../../../../constant/collections";
import { BaseModel } from "../../base.model";





@modelOptions({
    schemaOptions: {
        collection: Collections.ROLE
    }
})

@index(
    {
        name: 1
    },
    {
        unique: true,
        background: true,
        name: 'name',
        partialFilterExpression: { isDeleted: { $eq: false } }
    },
)

@index(
    {
        isDeleted: 1,
    },
    {
        background: true,
        name: 'deleted',
        partialFilterExpression: { isDeleted: { $eq: false } }
    }

)

export class Role extends BaseModel {
    @prop({ trim: true, required: true, })
    name: string;

    @prop({ default: false })
    role: boolean;

    @prop({ default: false })
    roleCreate: boolean;

    @prop({ default: false })
    roleUpdate: boolean;

    @prop({ default: false })
    roleDelete: boolean;

    @prop({ default: false })
    employee: boolean;

    @prop({ default: false })
    employeeCreate: boolean;

    @prop({ default: false })
    employeeUpdate: boolean;

    @prop({ default: false })
    employeeDelete: boolean;

    @prop({ default: false })
    category: boolean;

    @prop({ default: false })
    categoryCreate: boolean;

    @prop({ default: false })
    categoryUpdate: boolean;

    @prop({ default: false })
    categoryDelete: boolean;

    @prop({ default: false })
    seller: boolean;

    @prop({ default: false })
    sellerCreate: boolean;

    @prop({ default: false })
    sellerUpdate: boolean;

    @prop({ default: false })
    sellerDelete: boolean;
}


export const RoleModel = getModelForClass(Role)