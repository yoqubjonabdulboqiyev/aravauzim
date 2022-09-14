import { BaseError } from "../../../../../../baseError/base.error"
import { ErrorCode } from "../../../../../../constant/error.code"


export class PricePlusSellerError extends BaseError {
    static NotFound(data: any = null) {
        return new BaseError(ErrorCode.PRICE_PLUS_SELLER, "price not found", data)
    }
    static NotEnoughPermission(data: any = null) {
        return new BaseError(ErrorCode.PRICE_PLUS_SELLER + 1, "Not enough permission", data)
    }
    static AlreadyExists(data: any = null) {
        return new BaseError(ErrorCode.PRICE_PLUS_SELLER + 2, "price already exists", data)
    }

    static NotRequired(data: any = null) {
        return new BaseError(ErrorCode.PRICE_PLUS_SELLER + 2, "price required", data)
    }
    
}
