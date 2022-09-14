import { BaseError } from "../../../../../baseError/base.error"
import { ErrorCode } from "../../../../../constant/error.code"




export class MeasureError extends BaseError {
    static NotFound(data: any = null) {
        return new BaseError(ErrorCode.MEASURE, "measure not found", data)
    }
    static NotEnoughPermission(data: any = null) {
        return new BaseError(ErrorCode.MEASURE + 1, "Not enough permission", data)
    }
    static AlreadyExists(data: any = null) {
        return new BaseError(ErrorCode.MEASURE + 2, "measure already exists", data)
    }
    
}
