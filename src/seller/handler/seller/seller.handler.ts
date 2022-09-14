import { Roles } from "../../../common/constant/roles";
import { SellerError } from "../../../common/db/model/seller/seller.error";
import { roleService } from "../../../common/service/admin/role.service";
import { sellerService } from "../../../common/service/seller/seller.service";
import { PagingDto } from "../../../common/validation/dto/paging.dto";
import { SellerDto } from "../../../common/validation/dto/seller/seller.dto";
import { DtoGroups } from "../../../common/validation/dtoGroups";
import { validateIt } from "../../../common/validation/validateIt";


export async function createSellerHandler(req, res, next) {
    try {
        const data = await validateIt(req.body, SellerDto, DtoGroups.CREATE);
        const seller = await sellerService.createSeller(data)
        return res.send(SellerError.Success(seller))
    } catch (e) {
        return next(e)
    }
}


export async function getByIdSellerHandler(req, res, next) {
    try {
        const data = await validateIt(req.seller._id, SellerDto, DtoGroups.GET_BY_ID)
        const seller = await sellerService.findByIdError(data._id)
        return res.send(SellerError.Success(seller))
    } catch (e) {
        return next(e)
    }
}

export async function updateSellerHandler(req, res, next) {
    try {
        const data = await validateIt({ ...req.seller._id, ...req.body }, SellerDto, DtoGroups.UPDATE)
        const seller = await sellerService.updateSeller(data._id, data)
        return res.send(SellerError.Success(seller))
    } catch (e) {
        return next(e)
    }
}

export async function deleteSellerHandler(req, res, next) {
    try {
        const data = await validateIt(req.seller._id, SellerDto, DtoGroups.DELETE)
        const seller = await sellerService.deleteSeller(data._id)
        return res.send(SellerError.Success(seller))
    } catch (e) {
        return next(e)
    }
}


