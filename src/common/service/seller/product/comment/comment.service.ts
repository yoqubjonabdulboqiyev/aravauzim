import { ModelType } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";
import { Collections } from "../../../../constant/collections";
import { ProductComment, ProductCommentModel } from "../../../../db/model/seller/product/comment/comment.model";
import { PagingDto } from "../../../../validation/dto/paging.dto";
import { BaseServise } from "../../../base.service";



export class ProductCommentService extends BaseServise<ProductComment>{
    constructor(model: ModelType<ProductComment>) {
        super(model)
    }
    public async getPagingProductComment<T>(dto: PagingDto, id) {
        let query: any = { isDeleted: false }
        const $match = {
            $match: {
                productId: id
            }
        }
        const $lookupProduct = {
            $lookup: {
                from: Collections.PRODUCT,
                localField: "productId",
                foreignField: "_id",
                as: "product"
            }
        }
        const $unwindProduct = {
            $unwind: {
                path: "$product",
                preserveNullAndEmptyArrays: true,
            },
        };

        const $projection = {
            $project: {
                _id: 1,
                rating: 1,
                comment: 1,
                product: {
                    _id: 1,
                    name: 1,
                    imgUrl: 1,
                }
            },
        };
        const $pipeline = [$match, $lookupProduct, $unwindProduct, $projection];

        return await this.findPaging(query, dto, $pipeline)
    }


    public async getPaging<T>(dto: PagingDto) {
        let query: any = { isDeleted: false }
    
        const $lookupProduct = {
            $lookup: {
                from: Collections.PRODUCT,
                localField: "productId",
                foreignField: "_id",
                as: "product"
            }
        }
        const $unwindProduct = {
            $unwind: {
                path: "$product",
                preserveNullAndEmptyArrays: true,
            },
        };

        const $projection = {
            $project: {
                _id: 1,
                rating: 1,
                comment: 1,
                product: {
                    _id: 1,
                    name: 1,
                    imgUrl: 1,
                }
            },
        };
        const $pipeline = [$lookupProduct, $unwindProduct, $projection];

        return await this.findPaging(query, dto, $pipeline)
    }

}

export const productCommentServise = new ProductCommentService(ProductCommentModel)