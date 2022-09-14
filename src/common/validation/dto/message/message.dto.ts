import { IsEnum, IsOptional, IsString } from "class-validator";
import { Status } from "../../../db/model/message/message.model";
import { BaseDto, DtoGroups } from "../../dtoGroups";



export class MessageDto extends BaseDto{

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
    message : string

    @IsString({
        groups :[ DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
        groups:  [ DtoGroups.UPDATE]
    })
    @IsEnum({
        groups : [ DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    to : Status
}