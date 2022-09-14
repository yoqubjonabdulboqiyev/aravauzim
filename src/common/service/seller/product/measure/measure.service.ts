import { ModelType } from "@typegoose/typegoose/lib/types"
import { Types } from "mongoose"
import { MeasureError } from "../../../../db/model/seller/product/measure/measure.error";
import { Measure, MeasureModel } from "../../../../db/model/seller/product/measure/measure.model"
import { PagingDto } from "../../../../validation/dto/paging.dto"
import { BaseServise } from "../../../base.service"



export class MeasureService extends BaseServise<Measure>{
    constructor(model: ModelType<Measure>) {
        super(model)
    }

    public async findByIdError(id) {

        const $match = {
            $match: {
                isDeleted: false,
                _id: new Types.ObjectId(id)
            }
        }

        const $project = {
            $project: {
                name: 1,
                categoryId:1,
                fullName: 1,
                createdAt: 1,
                updatedAt: 1
            }
        }

        const $pipeline = [$match, $project]
        const measure = await this.aggregate($pipeline)
        if (!measure) throw MeasureError.NotFound(id)
        return measure
    }

    public async createMeasure(data) {
        try {
            const measure = await this.create(data)
            return await this.findByIdError(measure._id)
        }
        catch (e) {
            if (e.code == 11000) throw MeasureError.AlreadyExists(data)
            return e
        }
    }

    public async updateMeasure(id, data) {
        try {
            await this.findByIdError(id)
            const measure = await this.updateOne(id, data)
            return await this.findByIdError(measure._id)
        }
        catch (e) {
            if (e.code == 11000) throw MeasureError.AlreadyExists(data)
            return e
        }
    }

    public async deleteMeasure(id) {
        await this.findByIdError(id)
        const deleted = await this.deleteOne(id)
        return deleted._id
    }

    public async getPaging<T>(dto: PagingDto, id) {
        let query: any = { isDeleted: false }
        const $match = {
            $match: {
                categoryId: new Types.ObjectId(id)
            }
        }
        const $project = {
            $project: {
                name: 1,
                fullName:1,
                categoryId:1,
                createdAt: 1,
                updatedAt: 1
            }
        }

        const $pipeline = [$match]
        return await this.findPaging(query, dto, $pipeline)
    }

}

export const measureService = new MeasureService(MeasureModel)