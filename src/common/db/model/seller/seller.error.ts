import { BaseError } from "../../../baseError/base.error"
import { ErrorCode } from "../../../constant/error.code"


export class SellerError extends BaseError {
    static NotFound(data: any = null) {
        return new BaseError(ErrorCode.SELLER, "seller not found", data)
    }
    static NotEnoughPermission(data: any = null) {
        return new BaseError(ErrorCode.SELLER + 1, "Not enough permission", data)
    }
    static AlreadyExists(data: any = null) {
        return new BaseError(ErrorCode.SELLER + 2, "seller already exists", data)
    }

    static InvalidToken(data: any = null) {
        return new BaseError(ErrorCode.SELLER + 4, "Invalid token", data)
    }
    
}
