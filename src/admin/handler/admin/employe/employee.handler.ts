import { Roles } from "../../../../common/constant/roles";
import { EmployeeError } from "../../../../common/db/model/admin/employee/employee.error";
import { employeeService } from "../../../../common/service/admin/employee.service";
import { roleService } from "../../../../common/service/admin/role.service";
import { EmployeeDto } from "../../../../common/validation/dto/admin/employee.dto";
import { PagingDto } from "../../../../common/validation/dto/paging.dto";
import { DtoGroups } from "../../../../common/validation/dtoGroups";
import { validateIt } from "../../../../common/validation/validateIt";
import shrift from "sha256"
import { jwt } from "../../../../common/utils/jwt";

export async function createEmployeeHandler(req, res, next) {
    try {
        // const  roleId = (req.employee.role._id).toString()
        // await roleService.hasAccess(roleId, Roles.EMPLOYEE_CREATE)
        const data = await validateIt(req.body, EmployeeDto, DtoGroups.CREATE);
        data.password = shrift(data.password)
        const employee = await employeeService.createEmployee(data)
        return res.send(EmployeeError.Success(employee))
    } catch (e) {
        return next(e)
    }
}


export async function getByIdEmployeeHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.EMPLOYEE)

        const data = await validateIt(req.params, EmployeeDto, DtoGroups.GET_BY_ID)
        const employee = await employeeService.findByIdError(data._id)
        return res.send(EmployeeError.Success(employee))
    } catch (e) {
        return next(e)
    }
}


export async function getPagingEmployeeHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.EMPLOYEE)

        const data = await validateIt(req.query, PagingDto, DtoGroups.PAGENATION)
        const employees = await employeeService.getPaging(data)
        if (!employees) throw EmployeeError.NotFound()
        return res.send(EmployeeError.Success(employees))
    } catch (e) {
        return next(e)
    }
}

export async function updateEmployeeHandler(req, res, next) {
    try {

        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.EMPLOYEE_UPDATE)

        const data = await validateIt({ ...req.params, ...req.body }, EmployeeDto, DtoGroups.UPDATE)
        if (data.password) {
            data.password = shrift(data.password)
        }
        const employee = await employeeService.update(data._id, data)
        return res.send(EmployeeError.Success(employee))
    } catch (e) {
        return next(e)
    }
}

export async function deleteEmployeeHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.EMPLOYEE_DELETE)

        const data = await validateIt(req.params, EmployeeDto, DtoGroups.DELETE)
        const employee = await employeeService.deleteEmployee(data._id)
        return res.send(EmployeeError.Success(employee))
    } catch (e) {
        return next(e)
    }
}

export async function signInHandler(req, res, next) {
    try {
        const data = await validateIt(req.body, EmployeeDto, DtoGroups.LOGIN);
        const employee = await employeeService.findByPhoneNumber(data.phoneNumber);
        if (shrift(data.password) != employee.password) throw EmployeeError.InvalidPassword();
        const token = await jwt.sign({ phoneNumber: employee.phoneNumber })

        return res.send(EmployeeError.Success({
            token,
            employee: {
                _id: employee._id,
                firstName: employee.firstName,
                lastName: employee.lastName,
                phoneNumber: employee.phoneNumber
            }
        }));
    }
    catch (e) {
        return next(e);
    }
}

