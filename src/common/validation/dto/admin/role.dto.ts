import { IsOptional, IsMongoId, IsBoolean, IsString, ValidateIf, IsNumber } from 'class-validator';
import { BaseDto, DtoGroups } from '../../dtoGroups';


export class RoleDto extends BaseDto {
    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })

    @IsString({
        groups: [DtoGroups.UPDATE, DtoGroups.CREATE],
    })

    name: string;

    @IsBoolean({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    @IsOptional({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    category: boolean;

    @IsBoolean({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    @IsOptional({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    categoryCreate: boolean;

    @IsBoolean({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    @IsOptional({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    categoryUpdate: boolean;

    @IsBoolean({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    @IsOptional({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    categoryDelete: boolean;

    @IsBoolean({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    @IsOptional({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    seller: boolean;

    @IsBoolean({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    @IsOptional({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    sellerCreate: boolean;

    @IsBoolean({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    @IsOptional({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    sellerUpdate: boolean;

    @IsBoolean({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    @IsOptional({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    sellerDelete: boolean;

    @IsBoolean({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    @IsOptional({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    role: boolean;

    @IsBoolean({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    @IsOptional({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    roleCreate: boolean;

    @IsBoolean({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    @IsOptional({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    roleUpdate: boolean;

    @IsBoolean({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    @IsOptional({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    roleDelete: boolean;

    @IsBoolean({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    @IsOptional({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    employee: boolean;

    @IsBoolean({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    @IsOptional({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    employeeCreate: boolean;

    @IsBoolean({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    @IsOptional({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    employeeUpdate: boolean;

    @IsBoolean({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    @IsOptional({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    employeeDelete: boolean;
}