import { ModelType } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";
import { Collections } from "../../../constant/collections";
import { SellerComment, SellerCommentModel } from "../../../db/model/seller/comment/comment.model";
import { PagingDto } from "../../../validation/dto/paging.dto";
import { BaseServise } from "../../base.service";
import { productService } from "../product/product.service";



export class SellerCommentService extends BaseServise<SellerComment>{
    constructor(model: ModelType<SellerComment>) {
        super(model)
    }
    public async commentCount(id) {
        const $match = {
            $match: {
                sellerId: new Types.ObjectId(id),
                isDeleted: false
            }
        }

        const $pipeline = [$match]
        const comment = await (await this.aggregate($pipeline)).shift();
        return comment.count
    }

    public async getPagingSellerComment<T>(dto: PagingDto, id) {
        let query: any = { isDeleted: false }
        const $match = {
            $match: {
                sellerId: id
            }
        }
        const $lookupSeller = {
            $lookup: {
                from: Collections.SELLER,
                localField: "sellerId",
                foreignField: "_id",
                as: "seller"
            }
        }
        const $unwindSeller = {
            $unwind: {
                path: "$seller",
                preserveNullAndEmptyArrays: true,
            },
        };

        const $lookupClient = {
            $lookup: {
                from: Collections.CLIENT,
                localField: "clientId",
                foreignField: "_id",
                as: "client"
            }
        }
        const $unwindClient = {
            $unwind: {
                path: "$client",
                preserveNullAndEmptyArrays: true,
            },
        };

        const $projection = {
            $project: {
                _id: 1,
                rating: 1,
                comment: 1,
                client: {
                    _id: 1,
                    firstName: 1,
                    lastName :1,
                    imgUrl: 1,
                }
            },
        };
        const $pipeline = [$match, $lookupSeller, $unwindSeller, $lookupClient, $unwindClient, $projection];

        return await this.findPaging(query, dto, $pipeline)
    }

}

export const sellerCommentServise = new SellerCommentService(SellerCommentModel)