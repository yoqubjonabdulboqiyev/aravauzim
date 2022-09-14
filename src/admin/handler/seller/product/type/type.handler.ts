import { Roles } from "../../../../../common/constant/roles"
import { TypeError } from "../../../../../common/db/model/seller/product/type/type.error"
import { roleService } from "../../../../../common/service/admin/role.service"
import { typeService } from "../../../../../common/service/seller/product/type/type.service"
import { PagingDto } from "../../../../../common/validation/dto/paging.dto"
import { CategoryDto } from "../../../../../common/validation/dto/seller/product/category/category.dto"
import { TypeDto } from "../../../../../common/validation/dto/seller/product/type/type.dto"
import { DtoGroups } from "../../../../../common/validation/dtoGroups"
import { validateIt } from "../../../../../common/validation/validateIt"




export async function createTypeHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.CATEGORY)
        const data = await validateIt(req.body, TypeDto, DtoGroups.CREATE)
        const type = await typeService.createType(data)
        return res.send(TypeError.Success(type))
    } catch (e) {
        return next(e)
    }

}

export async function getByIdProductTypeHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.CATEGORY)
        const data = await validateIt(req.params, TypeDto, DtoGroups.GET_BY_ID)
        const productType = await typeService.findByIdError(data._id)
        return res.send(TypeError.Success(productType))
    } catch (e) {
        return next(e)
    }
}

export async function getByIdProductTypeFieldHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.CATEGORY)
        const data = await validateIt(req.params, TypeDto, DtoGroups.GET_BY_ID)
        const field = await typeService.productTypeField(data._id)
        return res.send(TypeError.Success(field))
    } catch (e) {
        return next(e)
    }
}

export async function getByIdProductTypeValueHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.CATEGORY)
        const data = await validateIt(req.params, TypeDto, DtoGroups.GET_BY_ID)
        const field = await typeService.productTypeValue(data._id)
        return res.send(TypeError.Success(field))
    } catch (e) {
        return next(e)
    }
}

export async function getPagingProductTypeHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.CATEGORY)
        const categoryId = await validateIt(req.params, CategoryDto, DtoGroups.GET_BY_ID)
        const data = await validateIt(req.query, PagingDto, DtoGroups.PAGENATION)
        const productTypes = await typeService.getPaging(data, categoryId._id)
        if (!productTypes) throw TypeError.NotFound()
        return res.send(TypeError.Success(productTypes))
    } catch (e) {
        return next(e)
    }
}

export async function updateProductTypeHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.CATEGORY_UPDATE)
        const data = await validateIt({ ...req.params, ...req.body }, TypeDto, DtoGroups.UPDATE)
        const ProductType = await typeService.updateProductType(data._id, data)
        return res.send(TypeError.Success(ProductType))
    } catch (e) {
        return next(e)
    }
}


export async function deleteProductTypeHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.CATEGORY_DELETE)
        const data = await validateIt(req.params, TypeDto, DtoGroups.DELETE)
        const ProductType = await typeService.deleteProductType(data._id)
        return res.send(TypeError.Success(ProductType))
    } catch (e) {
        return next(e)
    }
}
