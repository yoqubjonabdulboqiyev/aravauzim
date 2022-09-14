import { Roles } from "../../../../../common/constant/roles";
import { MeasureError } from "../../../../../common/db/model/seller/product/measure/measure.error";
import { roleService } from "../../../../../common/service/admin/role.service";
import { measureService } from "../../../../../common/service/seller/product/measure/measure.service";
import { MeasureDto } from "../../../../../common/validation/dto/seller/product/measure/measure.dto";
import { PagingDto } from "../../../../../common/validation/dto/paging.dto";
import { DtoGroups } from "../../../../../common/validation/dtoGroups";
import { validateIt } from "../../../../../common/validation/validateIt";
import { CategoryDto } from "../../../../../common/validation/dto/seller/product/category/category.dto";




export async function createMeasureHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.CATEGORY_CREATE)
        const data = await validateIt(req.body, MeasureDto, DtoGroups.CREATE);
        const measure = await measureService.createMeasure(data)
        return res.send(MeasureError.Success(measure))
    } catch (e) {
        return next(e)
    }
}


export async function getByIdMeasureHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.CATEGORY)
        const data = await validateIt(req.params, MeasureDto, DtoGroups.GET_BY_ID)
        const measure = await measureService.findByIdError(data._id)
        return res.send(MeasureError.Success(measure))
    } catch (e) {
        return next(e)
    }
}


export async function getPagingMeasureHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.CATEGORY)
        const categoryId = await validateIt(req.params, CategoryDto, DtoGroups.GET_BY_ID)
        const data = await validateIt(req.query, PagingDto, DtoGroups.PAGENATION)
        const measures = await measureService.getPaging(data, categoryId._id)
        if (!measures) throw MeasureError.NotFound()
        return res.send(MeasureError.Success(measures))
    } catch (e) {
        return next(e)
    }
}

export async function updateMeasureHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.CATEGORY_UPDATE)
        const data = await validateIt({ ...req.params, ...req.body }, MeasureDto, DtoGroups.UPDATE)
        const measure = await measureService.updateMeasure(data._id, data)
        return res.send(MeasureError.Success(measure))
    } catch (e) {
        return next(e)
    }
}

export async function deleteMeasureHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.CATEGORY_CREATE)
        const data = await validateIt(req.params, MeasureDto, DtoGroups.DELETE)
        const measure = await measureService.deleteMeasure(data._id)
        return res.send(MeasureError.Success(measure))
    } catch (e) {
        return next(e)
    }
}


