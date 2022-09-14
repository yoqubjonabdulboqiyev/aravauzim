import { Roles } from "../../../../common/constant/roles";
import { ProductError } from "../../../../common/db/model/seller/product/product.error";
import { roleService } from "../../../../common/service/admin/role.service";
import { productService } from "../../../../common/service/seller/product/product.service";
import { PagingDto } from "../../../../common/validation/dto/paging.dto";
import { CategoryDto } from "../../../../common/validation/dto/seller/product/category/category.dto";
import { ProductDto } from "../../../../common/validation/dto/seller/product/product.dto";
import { SellerDto } from "../../../../common/validation/dto/seller/seller.dto";
import { DtoGroups } from "../../../../common/validation/dtoGroups";
import { validateIt } from "../../../../common/validation/validateIt";


export async function createProductHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.SELLER_CREATE)
        const data = await validateIt(req.body, ProductDto, DtoGroups.CREATE);
        const product = await productService.createProduct(data)
        return res.send(ProductError.Success(product))
    } catch (e) {
        return next(e)
    }
}


export async function getByIdProductHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.SELLER)
        const data = await validateIt(req.params, ProductDto, DtoGroups.GET_BY_ID)
        const product = await productService.findByIdError(data._id)
        return res.send(ProductError.Success(product))
    } catch (e) {
        return next(e)
    }
}


export async function getPagingCategoryProductHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.SELLER)
        const category = await validateIt(req.params, CategoryDto, DtoGroups.GET_BY_ID)
        const data = await validateIt(req.query, PagingDto, DtoGroups.PAGENATION)
        const products = await productService.getPagingCategory(data, category._id)
        if (!products) throw ProductError.NotFound()
        return res.send(ProductError.Success(products))
    } catch (e) {
        return next(e)
    }
}

export async function getPagingSellerProductHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.SELLER)
        const seller = await validateIt(req.params, SellerDto, DtoGroups.GET_BY_ID)
        const data = await validateIt(req.query, PagingDto, DtoGroups.PAGENATION)
        const products = await productService.getPagingCategory(data, seller._id)
        if (!products) throw ProductError.NotFound()
        return res.send(ProductError.Success(products))
    } catch (e) {
        return next(e)
    }
}

export async function updateProductHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.SELLER_UPDATE)
        const data = await validateIt({ ...req.params, ...req.body }, ProductDto, DtoGroups.UPDATE)
        const product = await productService.updateProduct(data._id, data)
        return res.send(ProductError.Success(product))
    } catch (e) {
        return next(e)
    }
}

export async function deleteProductHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.SELLER_DELETE)
        const data = await validateIt(req.params, ProductDto, DtoGroups.DELETE)
        const product = await productService.deleteProduct(data._id)
        return res.send(ProductError.Success(product))
    } catch (e) {
        return next(e)
    }
}


export async function ProductCountHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        const productCount = await productService.Count()
        return res.send(ProductError.Success(productCount))
    } catch (e) {
        return next(e)
    }
}

