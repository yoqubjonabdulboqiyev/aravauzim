import { ModelType } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";
import { Collections } from "../../../constant/collections";
import { CategoryError } from "../../../db/model/seller/product/category/error";
import { ProductError } from "../../../db/model/seller/product/product.error";
import { Product, ProductModel } from "../../../db/model/seller/product/product.model";
import { PagingDto } from "../../../validation/dto/paging.dto";
import { BaseServise } from "../../base.service";
import { categoryService } from "./category/category.service";



export class ProductService extends BaseServise<Product>{
    constructor(model: ModelType<Product>) {
        super(model)
    }

    public async findByIdError(id) {
        const $match = {
            $match: {
                _id: new Types.ObjectId(id)
            }
        }
        const $lookupCategory = {
            $lookup: {
                from: Collections.CATEGORY,
                localField: "categoryId",
                foreignField: "_id",
                as: "category"
            }
        }
        const $unwindCategory = {
            $unwind: {
                path: "$category",
                preserveNullAndEmptyArrays: true,
            },
        };

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

        const $lookupMeasure = {
            $lookup: {
                from: Collections.MEASURE,
                localField: "measureId",
                foreignField: "_id",
                as: "measure"
            }
        }
        const $unwindMeasure = {
            $unwind: {
                path: "$measure",
                preserveNullAndEmptyArrays: true,
            },
        };


        const $projection = {
            $project: {
                _id: 1,
                imgUrl: 1,
                name: 1,
                description: 1,
                active: 1,
                category: {
                    _id: 1,
                    name: 1,
                    step: 1,
                },
                measure: {
                    name: 1,
                    _id: 1
                },
                seller: {
                    _id: 1,
                    firstName: 1,
                    lastName: 14
                }
            },
        };
        const $pipline = [$match, $lookupSeller, $unwindSeller, $lookupMeasure, $unwindMeasure, $lookupCategory, $unwindCategory, $projection];

        let Product = await this.aggregate($pipline);
        if (!Product) throw ProductError.NotFound(id);
        return Product;
    }

    public async createProduct(data) {
        try {
            console.log(data.sellerId)
            const category = await categoryService.find({ _id: data.categoryId, step: 2 })
            if (!category) {
                throw CategoryError.InvalidStep(data.categoryId)
            }
            const Product = await this.create(data)
            return await this.findByIdError(Product._id)
        }
        catch (e) {
            if (e.code == 11000) throw ProductError.AlreadyExists(data)
            return e
        }
    }

    public async updateProduct(id, data) {
        try {
            await this.findByIdError(id)
            const Product = await this.updateOne(id, data)
            return await this.findByIdError(Product._id)
        }
        catch (e) {
            if (e.code == 11000) throw ProductError.AlreadyExists(data)
            return e
        }
    }

    public async deleteProduct(id) {
        await this.findByIdError(id)
        const Product = await this.deleteOne(id)
        return Product._id
    }

    public async getPagingCategory<T>(dto: PagingDto, id) {
        let query: any = { isDeleted: false }
        const $match = {
            $match: {
                categoryId: new Types.ObjectId(id)
            }
        }
        const $lookupCategory = {
            $lookup: {
                from: Collections.CATEGORY,
                localField: "categoryId",
                foreignField: "_id",
                as: "category"
            }
        }
        const $unwindCategory = {
            $unwind: {
                path: "$category",
                preserveNullAndEmptyArrays: true,
            },
        };

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

        const $lookupMeasure = {
            $lookup: {
                from: Collections.MEASURE,
                localField: "measureId",
                foreignField: "_id",
                as: "measure"
            }
        }
        const $unwindMeasure = {
            $unwind: {
                path: "$measure",
                preserveNullAndEmptyArrays: true,
            },
        };


        const $projection = {
            $project: {
                _id: 1,
                imgUrl: 1,
                name: 1,
                description: 1,
                active: 1,
                category: {
                    _id: 1,
                    name: 1,
                    step: 1,
                },
                measure: {
                    name: 1,
                    _id: 1
                },
                seller: {
                    _id: 1,
                    firstName: 1,
                    lastName: 1,
                }
            },
        };
        const $pipeline = [$match, $lookupCategory, $unwindCategory, $lookupMeasure, $unwindMeasure, $lookupSeller, $unwindSeller, $projection];

        return await this.findPaging(query, dto, $pipeline)
    }

    public async getPagingSeller<T>(dto: PagingDto, id) {
        let query: any = { isDeleted: false }
        const $match = {
            $match: {
                sellerId: new Types.ObjectId(id)
            }
        }
        const $lookupCategory = {
            $lookup: {
                from: Collections.CATEGORY,
                localField: "categoryId",
                foreignField: "_id",
                as: "category"
            }
        }
        const $unwindCategory = {
            $unwind: {
                path: "$category",
                preserveNullAndEmptyArrays: true,
            },
        };

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

        const $lookupMeasure = {
            $lookup: {
                from: Collections.MEASURE,
                localField: "measureId",
                foreignField: "_id",
                as: "measure"
            }
        }
        const $unwindMeasure = {
            $unwind: {
                path: "$measure",
                preserveNullAndEmptyArrays: true,
            },
        };


        const $projection = {
            $project: {
                _id: 1,
                imgUrl: 1,
                name: 1,
                description: 1,
                active: 1,
                category: {
                    _id: 1,
                    name: 1,
                    step: 1,
                },
                measure: {
                    name: 1,
                    _id: 1
                },
                seller: {
                    _id: 1,
                    firstName: 1,
                    lastName: 1,
                }
            },
        };
        const $pipeline = [$match, $lookupCategory, $unwindCategory, $lookupMeasure, $unwindMeasure, $lookupSeller, $unwindSeller, $projection];

        return await this.findPaging(query, dto, $pipeline)
    } 

    public async getPagingSellerProduct<T>(dto: PagingDto, id) {
        let query: any = { isDeleted: false }
        const $match = {
            $match: {
                sellerId: id
            }
        }
        const $lookupCategory = {
            $lookup: {
                from: Collections.CATEGORY,
                localField: "categoryId",
                foreignField: "_id",
                as: "category"
            }
        }
        const $unwindCategory = {
            $unwind: {
                path: "$category",
                preserveNullAndEmptyArrays: true,
            },
        };

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

        const $lookupMeasure = {
            $lookup: {
                from: Collections.SELLER,
                localField: "measureId",
                foreignField: "_id",
                as: "measure"
            }
        }
        const $unwindMeasure = {
            $unwind: {
                path: "$measure",
                preserveNullAndEmptyArrays: true,
            },
        };


        const $projection = {
            $project: {
                _id: 1,
                imgUrl: 1,
                name: 1,
                description: 1,
                tanNarx: 1,
                sotishNarx: 1,
                count: 1,
                collor: 1,
                sotilishMiqdori: 1,
                optomNarx: 1,
                active: 1,
                category: {
                    _id: 1,
                    name: 1,
                    step: 1,
                },
                measure: {
                    name: 1,
                    _id: 1
                },
                seller: {
                    _id: 1,
                    firstName: 1
                }
            },
        };
        const $pipeline = [$match, $lookupCategory, $unwindCategory, $lookupMeasure, $unwindMeasure, $lookupSeller, $unwindSeller, $projection];

        return await this.findPaging(query, dto, $pipeline)
    }

    public async Count() {
        const $match = {
            $match: {
                isDeleted: false
            }
        }
        const count = await productService.aggregate([$match])
        return count.length
    }

}

export const productService = new ProductService(ProductModel)