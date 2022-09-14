import { BaseError } from "../../../../baseError/base.error"
import { ErrorCode } from "../../../../constant/error.code"

export class SellerInterestedError extends BaseError {
    static NotFound(data: any = null) {
        return new BaseError(ErrorCode.SELLER_INTERESTED, "intrested not found", data)
    }
    static NotEnoughPermission(data: any = null) {
        return new BaseError(ErrorCode.SELLER_INTERESTED + 1, "Not enough permission", data)
    }
    static AlreadyExists(data: any = null) {
        return new BaseError(ErrorCode.SELLER_INTERESTED + 2, "intrested already exists", data)
    }

    static InvalidToken(data: any = null) {
        return new BaseError(ErrorCode.SELLER_INTERESTED + 3, "Invalid token", data)
    }
    
}
