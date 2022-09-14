import { Roles } from "../../../common/constant/roles"
import { RegionError } from "../../../common/db/model/region/region.error"
import { roleService } from "../../../common/service/admin/role.service"
import { regionService } from "../../../common/service/region/region.service"
import { PagingDto } from "../../../common/validation/dto/paging.dto"
import { RegionDto } from "../../../common/validation/dto/region/region.dto"
import { DtoGroups } from "../../../common/validation/dtoGroups"
import { validateIt } from "../../../common/validation/validateIt"


export async function createRegionHandler(req, res, next) {
    try {
        const  roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.EMPLOYEE_CREATE)
        const data = await validateIt(req.body, RegionDto, DtoGroups.CREATE)
        const region = await regionService.createRegion(data)
        return res.send(RegionError.Success(region))
    } catch (e) {
        return next(e)
    }
}

export async function getByIdRegionHandler(req, res, next) {
    try {
        const  roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.EMPLOYEE_CREATE)
        const data = await validateIt(req.params, RegionDto, DtoGroups.GET_BY_ID)
        const region = await regionService.findByIdError(data._id)
        return res.send(RegionError.Success(region))
    } catch (e) {
        return next(e)
    }
}

export async function getPagingRegionHandler(req, res, next) {
    try {
        const  roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.EMPLOYEE)

        const data = await validateIt(req.query, PagingDto, DtoGroups.PAGENATION)
        const region = await regionService.getPaging(data)
        if (!region) throw RegionError.NotFound(data)
        return res.send(RegionError.Success(region))
    } catch (e) {
        return next(e)
    }
}

export async function updateRegionHandler(req, res, next) {
    try {

        const  roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.EMPLOYEE_UPDATE)
        const data = await validateIt({ ...req.params, ...req.body }, RegionDto, DtoGroups.UPDATE)
        const region = await regionService.updateRegion(data._id, data)
        return res.send(RegionError.Success(region))
    } catch (e) {
        return next(e)
    }
}

export async function deleteRegionHandler(req, res, next) {
    try {
        const  roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.EMPLOYEE_DELETE)

        const data = await validateIt(req.params, RegionDto, DtoGroups.DELETE)
        const region = await regionService.deleteRegion(data._id)
        return res.send(RegionError.Success(region))
    } catch (e) {
        return next(e)
    }
}