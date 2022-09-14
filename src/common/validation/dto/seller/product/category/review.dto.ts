import { IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";
import { BaseDto, DtoGroups } from "../../../../dtoGroups";



export class CategoryReviewDto extends BaseDto{
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
    count : number;
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
}