import { BaseError } from "../../../../../../baseError/base.error"
import { ErrorCode } from "../../../../../../constant/error.code"


export class PricePlusError extends BaseError {
    static NotFound(data: any = null) {
        return new BaseError(ErrorCode.PRICE_PLUS, "price not found", data)
    }
    static NotEnoughPermission(data: any = null) {
        return new BaseError(ErrorCode.PRICE_PLUS + 1, "Not enough permission", data)
    }
    static AlreadyExists(data: any = null) {
        return new BaseError(ErrorCode.PRICE_PLUS + 2, "price already exists", data)
    }
    static duplicate(data: any = null) {
        return new BaseError(ErrorCode.PRICE_PLUS + 3, "placeholder dublicate", data)
    }
    
}
