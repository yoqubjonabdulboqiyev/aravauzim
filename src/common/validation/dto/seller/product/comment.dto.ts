import { IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";
import { BaseDto, DtoGroups } from "../../../dtoGroups";


export class ProductommentDto extends BaseDto{
    @IsOptional({
        groups : [ DtoGroups.UPDATE]
    })
    @IsNumber(
        {
            allowInfinity:false,
            allowNaN:false,
            maxDecimalPlaces:0
        },
        {
            groups :  [DtoGroups.CREATE, DtoGroups.UPDATE]
        }
    )
    rating : number;
    
    @IsOptional({
        groups : [ DtoGroups.UPDATE]
    })
    @IsString({
        groups : [ DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    comment : string

    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsMongoId({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    @IsString({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    clientId: string;

    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsMongoId({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    @IsString({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    productId: string;

}