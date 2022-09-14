import { Roles } from "../../../../../common/constant/roles";
import { CategoryError } from "../../../../../common/db/model/seller/product/category/error";
import { roleService } from "../../../../../common/service/admin/role.service";
import { categoryService } from "../../../../../common/service/seller/product/category/category.service";
import { CategoryDto } from "../../../../../common/validation/dto/seller/product/category/category.dto";
import { PagingDto } from "../../../../../common/validation/dto/paging.dto";
import { DtoGroups } from "../../../../../common/validation/dtoGroups";
import { validateIt } from "../../../../../common/validation/validateIt";
import { categoryReviewServise } from "../../../../../common/service/seller/product/category/review.service";




export async function createCategoryHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.CATEGORY_CREATE)
        const data = await validateIt(req.body, CategoryDto, DtoGroups.CREATE);
        if (data.parentId) {
            const category = await categoryService.findByIdError(data.parentId);
            if (category.step == 2) {
                throw CategoryError.InvalidStep(category.step)
            }
            data.step = 2;
        } else {
            data.step = 1
        }

        const category = await categoryService.createCategory(data)
        return res.send(CategoryError.Success(category))
    } catch (e) {
        return next(e)
    }
}


export async function getByIdCategoryHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.CATEGORY)
        const data = await validateIt(req.params, CategoryDto, DtoGroups.GET_BY_ID)
        const category = await categoryService.findByIdError(data._id)
        return res.send(CategoryError.Success(category))
    } catch (e) {
        return next(e)
    }
}


export async function getPagingCategoryHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.CATEGORY)
        const data = await validateIt(req.query, PagingDto, DtoGroups.PAGENATION)
        const categorys = await categoryService.getPaging(data)
        if (!categorys) throw CategoryError.NotFound()
        return res.send(CategoryError.Success(categorys))
    } catch (e) {
        return next(e)
    }
}

export async function getPagingSubCategoryHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.CATEGORY)
        const category = await validateIt(req.params, CategoryDto, DtoGroups.GET_BY_ID)
        const data = await validateIt(req.query, PagingDto, DtoGroups.PAGENATION)
        const categorys = await categoryService.getPagingSubCategory(data, category._id)
        if (!categorys) throw CategoryError.NotFound()
        return res.send(CategoryError.Success(categorys))
    } catch (e) {
        return next(e)
    }
}

export async function updateCategoryHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.CATEGORY_UPDATE)
        const data = await validateIt({ ...req.params, ...req.body }, CategoryDto, DtoGroups.UPDATE)
        const category = await categoryService.updateCategory(data._id, data)
        return res.send(CategoryError.Success(category))
    } catch (e) {
        return next(e)
    }
}

export async function deleteCategoryHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.CATEGORY_DELETE)
        const data = await validateIt(req.params, CategoryDto, DtoGroups.DELETE)
        const category = await categoryService.deleteCategory(data._id)
        return res.send(CategoryError.Success(category))
    } catch (e) {
        return next(e)
    }
}

export async function CategoryCountHandler(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        const categoryCount = await categoryService.Count()
        return res.send(CategoryError.Success(categoryCount))
    } catch (e) {
        return next(e)
    }
}

export async function TopCategories(req, res, next) {
    try {
        const roleId = (req.employee.role._id).toString()
        const topcategories = await categoryReviewServise.topCategories()
    } catch (e) {
        return next(e)
    }
}




