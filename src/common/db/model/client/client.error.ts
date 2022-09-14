import { BaseError } from "../../../baseError/base.error"
import { ErrorCode } from "../../../constant/error.code"


export class ClientError extends BaseError {
    static NotFound(data: any = null) {
        return new BaseError(ErrorCode.CLIENT, "client not found", data)
    }
    static NotEnoughPermission(data: any = null) {
        return new BaseError(ErrorCode.CLIENT + 1, "Not enough permission", data)
    }
    static AlreadyExists(data: any = null) {
        return new BaseError(ErrorCode.CLIENT + 2, "client already exists", data)
    }

    static InvalidToken(data: any = null) {
        return new BaseError(ErrorCode.CLIENT + 4, "Invalid token", data)
    }
    
}
