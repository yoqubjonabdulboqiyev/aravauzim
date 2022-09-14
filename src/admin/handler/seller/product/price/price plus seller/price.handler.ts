import { Roles } from "../../../../../../common/constant/roles";
import { PricePlusSellerError } from "../../../../../../common/db/model/seller/product/price/plus prise seller/price.error";
import { roleService } from "../../../../../../common/service/admin/role.service";
import { pricePlusSellerService } from "../../../../../../common/service/seller/product/price/plus price seller/price.service";
import { PagingDto } from "../../../../../../common/validation/dto/paging.dto";
import { CategoryDto } from "../../../../../../common/validation/dto/seller/product/category/category.dto";
import { PriceSellerDto } from "../../../../../../common/validation/dto/seller/product/price/plus price seller/price.dto";
import { DtoGroups } from "../../../../../../common/validation/dtoGroups";
import { validateIt } from "../../../../../../common/validation/validateIt";






export async function createPricePlusSellerHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.SELLER_CREATE)
        const data = await validateIt(req.body, PriceSellerDto, DtoGroups.CREATE);
        const PricePlusSeller = await pricePlusSellerService.createPricePlusSeller(data)
        return res.send(PricePlusSellerError.Success(PricePlusSeller))
    } catch (e) {
        return next(e)
    }
}


export async function getByIdPricePlusSellerHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.SELLER)
        const data = await validateIt(req.params, PriceSellerDto, DtoGroups.GET_BY_ID)
        const PricePlusSeller = await pricePlusSellerService.findByIdError(data._id)
        return res.send(PricePlusSellerError.Success(PricePlusSeller))
    } catch (e) {
        return next(e)
    }
}


export async function getPagingPricePlusSellerHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.SELLER)
        const category = await validateIt(req.params, CategoryDto, DtoGroups.GET_BY_ID)
        const data = await validateIt(req.query, PagingDto, DtoGroups.PAGENATION)
        const PricePlusSellers = await pricePlusSellerService.getPaging(data, category._id)
        if (!PricePlusSellers) throw PricePlusSellerError.NotFound()
        return res.send(PricePlusSellerError.Success(PricePlusSellers))
    } catch (e) {
        return next(e)
    }
}

// export async function updatePricePlusSellerHandler(req, res, next) {
//     try {
//         // const roleId = (req.employee.role._id).toString()
//         // await roleService.hasAccess(roleId, Roles.PRICE_PLUS_EMPLOYEE_UPDATE)
//         const data = await validateIt({ ...req.params, ...req.body }, PriceSellerDto, DtoGroups.UPDATE)
//         const PricePlusSeller = await pricePlusSellerService.updatePricePlusSeller(data._id, data)
//         return res.send(PricePlusSellerError.Success(PricePlusSeller))
//     } catch (e) {
//         return next(e)
//     }
// }

// export async function deletePricePlusSellerHandler(req, res, next) {
//     try {
//         // const roleId = (req.employee.role._id).toString()
//         // await roleService.hasAccess(roleId, Roles.PRICE_PLUS_EMPLOYEE_UPDATE)
//         const data = await validateIt(req.params, PriceSellerDto, DtoGroups.DELETE)
//         const PricePlusSeller = await pricePlusSellerService.deletePricePlusSeller(data._id)
//         return res.send(PricePlusSellerError.Success(PricePlusSeller))
//     } catch (e) {
//         return next(e)
//     }
// }


