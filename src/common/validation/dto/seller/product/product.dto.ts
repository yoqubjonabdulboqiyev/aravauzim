import { IsArray, IsEnum, IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";
import { Active } from "../../../../constant/enum";
import { BaseDto, DtoGroups } from "../../../dtoGroups";


export class ProductDto extends BaseDto {
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
    name: string;

    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsMongoId({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsString({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    categoryId: string;

    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsMongoId({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    @IsString({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    measureId: string;

    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsMongoId({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    @IsString({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    sellerId: string;

    @IsOptional({
        groups: [DtoGroups.UPDATE, DtoGroups.CREATE]
    })

    @IsString({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    description: string;
    
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

}