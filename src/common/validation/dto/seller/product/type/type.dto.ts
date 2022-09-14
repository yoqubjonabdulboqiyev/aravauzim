import { IsOptional, IsMongoId, IsString, IsEnum, IsBoolean, IsArray } from "class-validator";
import { ValueType } from "../../../../../db/model/seller/product/type/type.model";
import { BaseDto, DtoGroups } from "../../../../dtoGroups";
import { Type } from "class-transformer";

export class ValueDto extends BaseDto {
    @IsOptional({ groups: [DtoGroups.UPDATE] })
    @IsString({ groups: [DtoGroups.CREATE, DtoGroups.UPDATE] })
    name: string
}

export class ValueTypeDto extends BaseDto {

    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })

    @IsEnum({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsString({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    type: ValueType

    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsString({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    placeholder: string

    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsBoolean({
        groups: [DtoGroups.UPDATE, DtoGroups.CREATE]
    })
    required: boolean

    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsArray({
        groups: [DtoGroups.UPDATE, DtoGroups.CREATE]
    })
    @Type(() => ValueDto)
    name: ValueDto

}


export class TypeDto extends BaseDto {
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
    @Type(() => ValueTypeDto)
    type: ValueTypeDto
}