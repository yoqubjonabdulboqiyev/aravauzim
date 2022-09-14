import { IsMongoId, IsOptional, IsString } from "class-validator";
import { BaseModel } from "../../../../../db/model/base.model";
import { BaseDto, DtoGroups } from "../../../../dtoGroups";


export class MeasureDto extends BaseDto {

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
    name: string;

    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsString({
        groups: [DtoGroups.UPDATE, DtoGroups.CREATE]
    })
    fullName: string;
}