import { IsOptional, IsString } from "class-validator";
import { BaseDto, DtoGroups } from "../../dtoGroups";


export class RegionDto extends BaseDto {
    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsString({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    name: string
}