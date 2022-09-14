import { IsEnum, IsMongoId, IsOptional, IsPhoneNumber, IsString, MinLength } from "class-validator";
import { Status } from "../../../db/model/admin/employee/employee.model";
import { BaseDto, DtoGroups } from "../../dtoGroups";


export class EmployeeDto extends BaseDto {

    @IsOptional({
        groups: [DtoGroups.UPDATE, DtoGroups.CREATE]
    })

    @IsString({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    imgUrl: string;

    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })

    @IsString({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    firstName: string;

    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })

    @IsString({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    lastName: string;

    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })

    @IsString({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    @IsPhoneNumber(null, {
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE, DtoGroups.LOGIN]
    })

    phoneNumber: string;

    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })

    @IsString({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE, DtoGroups.LOGIN]
    })

    @MinLength(4, {
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE, DtoGroups.LOGIN]
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

    @IsOptional({ groups: [DtoGroups.UPDATE] })

    @IsString({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    @IsMongoId({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    roleId: string;
}