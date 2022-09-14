import { BaseError } from "../../../../baseError/base.error"
import { ErrorCode } from "../../../../constant/error.code"



export class ProductError extends BaseError {
    static NotFound(data: any = null) {
        return new BaseError(ErrorCode.PRODUCT, "product not found", data)
    }
    static NotEnoughPermission(data: any = null) {
        return new BaseError(ErrorCode.PRODUCT + 1, "Not enough permission", data)
    }
    static AlreadyExists(data: any = null) {
        return new BaseError(ErrorCode.PRODUCT + 2, "product already exists", data)
    }
    
}
