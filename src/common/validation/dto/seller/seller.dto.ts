

import { IsArray, IsEnum, IsMongoId, IsOptional, IsPhoneNumber, IsString, MinLength } from "class-validator";
import { Active, Gender } from "../../../constant/enum";
import { Status } from "../../../db/model/seller/seller.model";
import { BaseDto, DtoGroups } from "../../dtoGroups";


export class SellerDto extends BaseDto {
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
        groups: [DtoGroups.UPDATE]
    })
    @IsString({
        groups: [
            DtoGroups.CREATE,
            DtoGroups.UPDATE,
            DtoGroups.LOGIN
        ]
    })
    @IsPhoneNumber(null, {
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE, DtoGroups.LOGIN]
    })
    phoneNumber: string;

    @IsOptional({
        groups: [DtoGroups.UPDATE]
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
        groups: [DtoGroups.UPDATE]
    })
    @IsEnum({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsString({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    status: Status

    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsEnum({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsString({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    gender: Gender

    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsString({
        groups: [
            DtoGroups.CREATE,
            DtoGroups.UPDATE
        ]
    })
    @IsMongoId({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    addressId: string;

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

    @IsOptional({
        groups: [DtoGroups.UPDATE, DtoGroups.CREATE]
    })
    @IsString({
        groups: [
            DtoGroups.CREATE,
            DtoGroups.UPDATE
        ]
    })
    imgUrl: string;
}