import { Roles } from "../../../../common/constant/roles"
import { RoleError } from "../../../../common/db/model/admin/role/role.error"
import { roleService } from "../../../../common/service/admin/role.service"
import { RoleDto } from "../../../../common/validation/dto/admin/role.dto"
import { PagingDto } from "../../../../common/validation/dto/paging.dto"
import { DtoGroups } from "../../../../common/validation/dtoGroups"
import { validateIt } from "../../../../common/validation/validateIt"



export async function createRoleHandler(req, res, next) {
    try {
        const  roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.ROLE_CREATE)
        const data = await validateIt(req.body, RoleDto, DtoGroups.CREATE)
        const role = await roleService.createRole(data)
        return res.send(RoleError.Success(role))
    } catch (e) {
        return next(e)
    }
}

export async function getByIdRoleHandler(req, res, next) {
    try {
        const  roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.ROLE)
        const data = await validateIt(req.params, RoleDto, DtoGroups.GET_BY_ID)
        const role = await roleService.findByIdError(data._id)
        return res.send(RoleError.Success(role))
    } catch (e) {
        return next(e)
    }
}

export async function getPagingRoleHandler(req, res, next) {
    try {
        const  roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.ROLE)
        const data = await validateIt(req.query, PagingDto, DtoGroups.PAGENATION)
        const roles = await roleService.getPaging(data)
        if (!roles) throw RoleError.NotFound()
        return res.send(RoleError.Success(roles))
    } catch (e) {
        return next(e)
    }
}

export async function updateRoleHandler(req, res, next) {
    try {
        const  roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.ROLE_UPDATE)
        const data = await validateIt({ ...req.params, ...req.body }, RoleDto, DtoGroups.UPDATE)
        const role = await roleService.updateRole(data._id, data)
        return res.send(RoleError.Success(role))
    } catch (e) {
        return next(e)
    }
}

export async function deleteRoleHandler(req, res, next) {
    try {
        const  roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.ROLE_DELETE)
        const data = await validateIt(req.params, RoleDto, DtoGroups.DELETE)
        const role = await roleService.deleteRole(data._id)
        return res.send(RoleError.Success(role))
    } catch (e) {
        return next(e)
    }
}
