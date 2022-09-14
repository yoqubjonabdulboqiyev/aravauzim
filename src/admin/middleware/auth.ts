import { EmployeeError } from "../../common/db/model/admin/employee/employee.error";
import { employeeService } from "../../common/service/admin/employee.service";
import { jwt } from "../../common/utils/jwt";




export async function auth(req, res, next){
    try{
        const {phoneNumber} = jwt.verify(req.headers.token)
        const user = await employeeService.findByPhoneNumber(phoneNumber)
        if(user.phoneNumber!=phoneNumber) throw  EmployeeError.InvalidToken()
        req.employee = user;
        return next(); 
    } catch(e){
        throw e;
    }
}