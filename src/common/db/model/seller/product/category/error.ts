import { BaseError } from "../../../../../baseError/base.error"
import { ErrorCode } from "../../../../../constant/error.code"




export class CategoryError extends BaseError {
    static NotFound(data: any = null) {
        return new BaseError(ErrorCode.CATEGORY, "category not found", data)
    }
    static NotEnoughPermission(data: any = null) {
        return new BaseError(ErrorCode.CATEGORY + 1, "Not enough permission", data)
    }
    static AlreadyExists(data: any = null) {
        return new BaseError(ErrorCode.CATEGORY + 2, "category already exists", data)
    }

    static InvalidStep(data: any = null) {
        return new BaseError(ErrorCode.CATEGORY + 3, "Category Invalid step", data)
    }
    
}
