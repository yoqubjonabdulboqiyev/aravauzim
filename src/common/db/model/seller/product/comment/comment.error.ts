import { BaseError } from "../../../../../baseError/base.error"
import { ErrorCode } from "../../../../../constant/error.code"


export class CommentError extends BaseError {
    static NotFound(data: any = null) {
        return new BaseError(ErrorCode.PRODUCT_COMMENT, "comment not found", data)
    }
    static NotEnoughPermission(data: any = null) {
        return new BaseError(ErrorCode.PRODUCT_COMMENT + 1, "Not enough permission", data)
    }
    static AlreadyExists(data: any = null) {
        return new BaseError(ErrorCode.PRODUCT_COMMENT + 2, "comment already exists", data)
    }
    
}
