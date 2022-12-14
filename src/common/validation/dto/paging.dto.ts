import { Expose, Transform } from "class-transformer";
import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";
import { DtoGroups } from "../dtoGroups";


export class PagingDto {
    @Transform(({value})=> Number(value))
    @IsNumber(
        {
            allowInfinity : false,
            allowNaN : false,
            maxDecimalPlaces : 0,
        },
        {
            groups : [DtoGroups.PAGENATION]
        }
    )
    limit! : number;


    @Transform(({value})=> Number(value))
    @IsNumber(
        {
            allowInfinity : false,
            allowNaN : false,
            maxDecimalPlaces : 0,
        },
        {
            groups : [DtoGroups.PAGENATION]
        }
    )
    page! : number;
    
    @Expose({toClassOnly : true})
    @Transform(({value})=> value?.trim() || ' ')
    @IsString({
        groups : [DtoGroups.PAGENATION]
    })
    search?: string;

    @IsOptional({
        groups: [DtoGroups.PAGENATION],
      })
      @IsDateString(
        {
          strict: false,
        },
        {
          groups: [DtoGroups.PAGENATION],
        },
      )
      updatedAt?: string;
    
      @IsOptional({
        groups: [DtoGroups.PAGENATION],
      })
      @IsDateString(
        {
          strict: false,
        },
        {
          groups: [DtoGroups.PAGENATION],
        },
      )
      createdAt?: string;
    
      @IsOptional({
        groups: [DtoGroups.PAGENATION],
      })
      @IsString({
        groups: [DtoGroups.PAGENATION],
      })
      sortBy?: string;
    
      @Transform(({ value }) => Number(value))
      @IsOptional({
        groups: [DtoGroups.PAGENATION],
      })
      @IsNumber({
        allowInfinity: false,
        allowNaN: false,
      })
      asc?: number;
    
}