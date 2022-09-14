import { ModelType } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";
import { RegionError } from "../../db/model/region/region.error";
import { Region, RegionModel } from "../../db/model/region/region.model";
import { PagingDto } from "../../validation/dto/paging.dto";
import { BaseServise } from "../base.service";


export class RegionServise extends BaseServise<Region>{
    constructor(model: ModelType<Region>) {
        super(model)
    }
    public async findByIdError(id) {
        const $match = {
            $match: {
                _id: new Types.ObjectId(id),
                isDeleted: false
            }
        }

        const $projection = {
            $project: {
                _id: 1,
                name: 1,
                createdAt: 1,
                updatedAt: 1
            },
        };
        const $pipline = [$match, $projection];

        let region = await this.aggregate($pipline);
        if (!region) throw RegionError.NotFound(id);
        return region;
    }

    public async createRegion(data) {
        try {
            const region = await this.create(data)
            return await this.findByIdError(region._id)
        }
        catch (e) {
            if (e.code == 11000) throw RegionError.AlreadyExists(data)
            return e
        }
    }

    public async getPaging<T>(dto: PagingDto) {
        let query: any = { isDeleted: false };
        
        const $projection = {
            $project: {
                _id: 1,
                name: 1,
                createdAt: 1,
                updatedAt: 1
            },
        };
        const $pipline = [$projection];

        return await this.findPaging(query, dto, $pipline);
    }

    public async updateRegion(id, data) {
        try {
            await this.findByIdError(id)
            const region = await super.updateOne(id, data)
            return await this.findByIdError(region._id)
        } catch (e) {
            if (e.code == 11000) throw RegionError.AlreadyExists(Object.keys(e.keyPattern))
            return e
        }
    }

    public async deleteRegion(id) {
        await this.findByIdError(id)
        const deleteRegion = await this.updateOne(id, { isDeleted: true })
        return deleteRegion._id
    }

}

export const regionService = new RegionServise(RegionModel)
