import { IsOptional, IsString, IsPhoneNumber, MinLength, IsEnum, IsMongoId, IsArray } from "class-validator";
import { Active, Gender } from "../../../constant/enum";
import { BaseDto, DtoGroups } from "../../dtoGroups";


export class ClientDto extends BaseDto{
    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsString({
        groups: [
            DtoGroups.CREATE, 
            DtoGroups.UPDATE
        ]
    })
    firstName: string;

     @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsString({
        groups: [
            DtoGroups.CREATE, 
            DtoGroups.UPDATE
        ]
    })
    lastName: string;

    @IsOptional({
        groups: [ DtoGroups.UPDATE]
    })
    @IsString({
        groups: [
            DtoGroups.CREATE, 
            DtoGroups.UPDATE
        ]
    })
    @IsPhoneNumber(null,{
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE, DtoGroups.LOGIN]
    })
    phoneNumber: string;

    @IsOptional({
        groups: [ DtoGroups.UPDATE]
    })
    @IsString({
        groups: [
            DtoGroups.CREATE, 
            DtoGroups.UPDATE,
            DtoGroups.LOGIN
        ]
    })
    @MinLength(4, {
        groups: [
            DtoGroups.CREATE, 
            DtoGroups.UPDATE,
            DtoGroups.LOGIN
        ]
    })
    password: string;

    @IsOptional({
        groups:[DtoGroups.UPDATE]
    })
    @IsEnum({
        groups : [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsString({
        groups : [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    active : Active

    @IsOptional({groups: [DtoGroups.UPDATE]})
    @IsMongoId({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsArray({
        groups : [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    intrested: string;
    @IsOptional({
        groups:[DtoGroups.UPDATE]
    })
    @IsEnum({
        groups : [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsString({
        groups : [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    gender : Gender

    @IsOptional({
        groups: [DtoGroups.UPDATE, DtoGroups.CREATE]
    })
    @IsString({
        groups: [
            DtoGroups.CREATE, 
            DtoGroups.UPDATE
        ]
    })
    telegrammUserName: string;

}