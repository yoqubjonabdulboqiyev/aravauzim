import { Roles } from "../../../../../../common/constant/roles";
import { PricePlusError } from "../../../../../../common/db/model/seller/product/price/plus price admin/price.error";
import { roleService } from "../../../../../../common/service/admin/role.service";
import { pricePlusService, PricePlusService } from "../../../../../../common/service/seller/product/price/plus price admin/price.service";
import { PagingDto } from "../../../../../../common/validation/dto/paging.dto";
import { CategoryDto } from "../../../../../../common/validation/dto/seller/product/category/category.dto";
import { PlusPriceDto, PriceDto } from "../../../../../../common/validation/dto/seller/product/price/plus price admin/price.dto";
import { DtoGroups } from "../../../../../../common/validation/dtoGroups";
import { validateIt } from "../../../../../../common/validation/validateIt";





export async function createPricePlusHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.CATEGORY_CREATE)
        const data = await validateIt(req.body, PriceDto, DtoGroups.CREATE);
        const PricePlus = await pricePlusService.createPricePlus(data)
        return res.send(PricePlusError.Success(PricePlus))
    } catch (e) {
        return next(e)
    }
}


export async function getByIdPricePlusHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.CATEGORY)
        const data = await validateIt(req.params, PlusPriceDto, DtoGroups.GET_BY_ID)
        const PricePlus = await pricePlusService.findByIdError(data._id)
        return res.send(PricePlusError.Success(PricePlus))
    } catch (e) {
        return next(e)
    }
}

export async function getByIdPricePlusPlaceholderHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.CATEGORY)
        const data = await validateIt(req.params, PlusPriceDto, DtoGroups.GET_BY_ID)
        const PricePlus = await pricePlusService.placeholder(data._id)
        return res.send(PricePlusError.Success(PricePlus))
    } catch (e) {
        return next(e)
    }
}



export async function getPagingPricePlusHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.CATEGORY)
        const categoryId = await validateIt(req.params, CategoryDto, DtoGroups.GET_BY_ID)
        const data = await validateIt(req.query, PagingDto, DtoGroups.PAGENATION)
        const PricePluss = await pricePlusService.getPaging(data, categoryId._id)
        if (!PricePluss) throw PricePlusError.NotFound()
        return res.send(PricePlusError.Success(PricePluss))
    } catch (e) {
        return next(e)
    }
}

export async function updatePricePlusHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.CATEGORY_UPDATE)
        const data = await validateIt({ ...req.params, ...req.body }, PriceDto, DtoGroups.UPDATE)
        const PricePlus = await pricePlusService.updatePricePlus(data._id, data)
        return res.send(PricePlusError.Success(PricePlus))
    } catch (e) {
        return next(e)
    }
}

export async function deletePricePlusHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.CATEGORY_DELETE)
        const data = await validateIt(req.params, PriceDto, DtoGroups.DELETE)
        const PricePlus = await pricePlusService.deletePricePlus(data._id)
        return res.send(PricePlusError.Success(PricePlus))
    } catch (e) {
        return next(e)
    }
}


