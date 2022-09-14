import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsMongoId, IsOptional, IsString } from "class-validator";
import { Price } from "../../../../../../db/model/seller/product/price/price/price.model";
import { BaseDto, DtoGroups } from "../../../../../dtoGroups";



export class PlusPriceDto extends BaseDto {

    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsString({
        groups: [DtoGroups.UPDATE, DtoGroups.CREATE]
    })
    placeholder: string;

    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsBoolean({
        groups: [DtoGroups.UPDATE, DtoGroups.CREATE]
    })
    required: string;
}

export class PriceDto extends BaseDto{
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
    @IsArray({
        groups: [DtoGroups.UPDATE, DtoGroups.CREATE]
    })
    @Type(() => PlusPriceDto)
    price: PlusPriceDto
}