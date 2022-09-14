import { IsEnum, IsOptional, IsString } from "class-validator";
import { Status } from "../../../db/model/banner/banner.model";
import { BaseDto, DtoGroups } from "../../dtoGroups";



export class BannerDto extends BaseDto{

    @IsString({
        groups :[ DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
        groups:  [ DtoGroups.UPDATE]
    })
    imgUrl : string

    @IsString({
        groups :[ DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
        groups:  [ DtoGroups.UPDATE]
    })
    comment : string

    @IsString({
        groups :[ DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
        groups:  [ DtoGroups.UPDATE]
    })
    lifetime : string

    @IsString({
        groups :[ DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
        groups:  [ DtoGroups.UPDATE]
    })
    @IsEnum({
        groups : [ DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    status : Status
    
}