import { ModelType } from "@typegoose/typegoose/lib/types"
import { Types } from "mongoose"
import { Collections } from "../../constant/collections"
import { SellerError } from "../../db/model/seller/seller.error"
import { Seller, SellerModel } from "../../db/model/seller/seller.model"
import { PagingDto } from "../../validation/dto/paging.dto"

import { BaseServise } from "../base.service"
import { productService } from "./product/product.service"



export class SellerService extends BaseServise<Seller>{
    constructor(model: ModelType<Seller>) {
        super(model)
    }

    public async findByIdError(id) {
        const $match = {
            $match: {
                _id: new Types.ObjectId(id)
            }
        }
        const $projection = {
            $project: {
                _id: 1,
                lastName: 1,
                firstName: 1,
                password: 1,
                phoneNumber: 1,
                gender: 1,
                addressId: 1,
                telegrammUserName: 1,
                imgUrl: 1,
                status: 1,
            },
        };
        const $pipline = [$match, $projection];

        let seller = await (await this.aggregate($pipline)).shift();
        if (!seller) throw SellerError.NotFound(id);
        
        return seller;
    }

    public async createSeller(data) {
        try {
            const seller = await this.create(data)
            return await this.findByIdError(seller._id)
        }
        catch (e) {
            if (e.code == 11000) throw SellerError.AlreadyExists(data)
            return e
        }
    }

    public async updateSeller(id, data) {
        try {
            await this.findByIdError(id)
            const seller = await this.updateOne(id, data)
            return await this.findByIdError(seller._id)
        }
        catch (e) {
            if (e.code == 11000) throw SellerError.AlreadyExists(data)
            return e
        }
    }

    public async deleteSeller(id) {
        await this.findByIdError(id)
        const seller = await this.deleteOne(id)
        return seller._id
    }

    public async getPaging<T>(dto: PagingDto) {
        let query: any = { isDeleted: false }
        
        const $projection = {
            $project: {
                _id: 1,
                lastName: 1,
                firstName: 1,
                password: 1,
                phoneNumber: 1,
                gender: 1,
                addressId: 1,
                telegrammUserName: 1,
                imgUrl: 1,
                status: 1,
            },
        };
        const $pipeline = [$projection];
        return await this.findPaging(query, dto, $pipeline)
    }

    public async Count(){
        const $match = {
            $match : {
                isDeleted : false
            }
        }
        const count = await this.aggregate([$match])
        return count.length
    }
    public async findByPhoneNumber(phoneNumber: string) {
        const $match = {
            $match: {
                phoneNumber: phoneNumber
            }
        }
        const $lookup = {
            $lookup: {
                from: Collections.ROLE,
                localField: "roleId",
                foreignField: "_id",
                as: "role"
            }
        }
        const $unwindRole = {
            $unwind: {
                path: "$role",
                preserveNullAndEmptyArrays: true,
            },
        };
        const $projection = {
            $project: {
                _id: 1,
                lastName: 1,
                firstName: 1,
                password: 1,
                phoneNumber: 1,
                gender: 1,
                address: 1,
                telegrammUserName: 1,
                imgUrl: 1,
                active: 1,
                role: {
                    _id: 1,
                    name: 1,
                },
            },
        };
        const $pipline = [$match, $lookup, $unwindRole, $projection];

        let seller = await (await this.aggregate($pipline)).shift();
        if (!seller) throw SellerError.NotFound(phoneNumber);
        return seller;
    }

    public async productCount(id) {
        const $match = {
            $match: {
                sellerId: new Types.ObjectId(id),
                isDeleted: false
            }
        }

        const $pipeline = [$match]
        const product = await (await productService.aggregate($pipeline)).shift();
        return product.count
    }


}

export const sellerService = new SellerService(SellerModel)   