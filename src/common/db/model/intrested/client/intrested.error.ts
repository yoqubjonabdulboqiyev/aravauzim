import { BaseError } from "../../../../baseError/base.error"
import { ErrorCode } from "../../../../constant/error.code"



export class ClientInterestedError extends BaseError {
    static NotFound(data: any = null) {
        return new BaseError(ErrorCode.CLIENT_INTERESTED, "interested not found", data)
    }
    static NotEnoughPermission(data: any = null) {
        return new BaseError(ErrorCode.CLIENT_INTERESTED + 1, "Not enough permission", data)
    }
    static AlreadyExists(data: any = null) {
        return new BaseError(ErrorCode.CLIENT_INTERESTED + 2, "intrested already exists", data)
    }

    static InvalidToken(data: any = null) {
        return new BaseError(ErrorCode.CLIENT_INTERESTED + 4, "Invalid token", data)
    }
    
}
