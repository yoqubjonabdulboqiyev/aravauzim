import { IsOptional, IsString, IsMongoId, IsNumber, IsInt } from "class-validator";
import { BaseDto, DtoGroups } from "../../../../dtoGroups";


export class CategoryDto extends BaseDto{
    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsString({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    name: string

    @IsOptional({
        groups: [DtoGroups.UPDATE, DtoGroups.CREATE]
    })
    @IsString({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsMongoId({
        groups : [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    parentId: string;
    
    @IsInt()
    step: number;
}