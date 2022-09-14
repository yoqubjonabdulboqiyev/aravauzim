import { BaseError } from "../../../../../baseError/base.error"
import { ErrorCode } from "../../../../../constant/error.code"


export class TypeError extends BaseError {
    static NotFound(data: any = null) {
        return new BaseError(ErrorCode.TYPE, "type not found", data)
    }
    static NotEnoughPermission(data: any = null) {
        return new BaseError(ErrorCode.TYPE + 1, "Not enough permission", data)
    }
    static AlreadyExists(data: any = null) {
        return new BaseError(ErrorCode.TYPE + 2, "type already exists", data)
    }
    
}
