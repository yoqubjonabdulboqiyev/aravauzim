import { BaseError } from "../../../baseError/base.error"
import { ErrorCode } from "../../../constant/error.code"


export class RegionError extends BaseError {
    static NotFound(data: any = null) {
        return new BaseError(ErrorCode.REGION, "region not found", data)
    }
    static NotEnoughPermission(data: any = null) {
        return new BaseError(ErrorCode.REGION + 1, "Not enough permission", data)
    }
    static AlreadyExists(data: any = null) {
        return new BaseError(ErrorCode.REGION + 2, "region already exists", data)
    }
    
}
