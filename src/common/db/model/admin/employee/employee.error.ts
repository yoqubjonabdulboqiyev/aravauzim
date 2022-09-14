import { BaseError } from "../../../../baseError/base.error"
import { ErrorCode } from "../../../../constant/error.code"



export class EmployeeError extends BaseError {
    static NotFound(data: any = null) {
        return new BaseError(ErrorCode.EMPLOYEE, "Employee not found", data)
    }
    static NotEnoughPermission(data: any = null) {
        return new BaseError(ErrorCode.EMPLOYEE + 1, "Not enough permission", data)
    }
    static AlreadyExists(data: any = null) {
        return new BaseError(ErrorCode.EMPLOYEE + 2, "Employee already exists", data)
    }
    static InvalidPassword(data: any = null) {
        return new BaseError(ErrorCode.EMPLOYEE + 3, "invalid password", data)
    }
    static InvalidToken(data: any = null) {
        return new BaseError(ErrorCode.EMPLOYEE + 4, "invalid token", data)
    }
}
