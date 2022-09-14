import { IsArray, IsMongoId, IsOptional, IsString } from "class-validator";
import { BaseDto, DtoGroups } from "../../../../../dtoGroups";



export class PriceSellerDto extends BaseDto{
    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsString({
        groups: [DtoGroups.UPDATE, DtoGroups.CREATE]
    })
    @IsMongoId({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    categoryId: string;

    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsString({
        groups: [DtoGroups.UPDATE, DtoGroups.CREATE]
    })
    @IsMongoId({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    priceId: string;

    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsString({
        groups: [DtoGroups.UPDATE, DtoGroups.CREATE]
    })
    @IsMongoId({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    productId: string;

    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsArray({
        groups: [DtoGroups.UPDATE, DtoGroups.CREATE]
    })
    price: []
}