import { Roles } from "../../../common/constant/roles";
import { ClientError } from "../../../common/db/model/client/client.error";
import { SellerError } from "../../../common/db/model/seller/seller.error";
import { roleService } from "../../../common/service/admin/role.service";
import { clientService } from "../../../common/service/client/client.service";
import { sellerService } from "../../../common/service/seller/seller.service";
import { PagingDto } from "../../../common/validation/dto/paging.dto";
import { SellerDto } from "../../../common/validation/dto/seller/seller.dto";
import { DtoGroups } from "../../../common/validation/dtoGroups";
import { validateIt } from "../../../common/validation/validateIt";
import shrift from "sha256"

export async function createSellerHandler(req, res, next) {
    try {
        const  roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.SELLER_CREATE)
        const data = await validateIt(req.body, SellerDto, DtoGroups.CREATE);
        data.password = shrift(data.password)
        const seller = await sellerService.createSeller(data)
        return res.send(SellerError.Success(seller))
    } catch (e) {
        return next(e)
    }
}


export async function getByIdSellerHandler(req, res, next) {
    try {
        const  roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.SELLER)
        const data = await validateIt(req.params, SellerDto, DtoGroups.GET_BY_ID)
        const seller = await sellerService.findByIdError(data._id)
        return res.send(SellerError.Success(seller))
    } catch (e) {
        return next(e)
    }
}


export async function getPagingSellerHandler(req, res, next) {
    try {
        const  roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.SELLER)
        const data = await validateIt(req.query, PagingDto, DtoGroups.PAGENATION)
        const sellers = await sellerService.getPaging(data)
        if (!sellers) throw SellerError.NotFound()
        return res.send(SellerError.Success(sellers))
    } catch (e) {
        return next(e)
    }
}

export async function updateSellerHandler(req, res, next) {
    try {
        const  roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.SELLER_UPDATE)
        const data = await validateIt({ ...req.params, ...req.body }, SellerDto, DtoGroups.UPDATE)
        const seller = await sellerService.updateSeller(data._id, data)
        return res.send(SellerError.Success(seller))
    } catch (e) {
        return next(e)
    }
}

export async function deleteSellerHandler(req, res, next) {
    try {
        const  roleId = (req.employee.role._id).toString()
        await roleService.hasAccess(roleId, Roles.SELLER_DELETE)
        const data = await validateIt(req.params, SellerDto, DtoGroups.DELETE)
        const seller = await sellerService.deleteSeller(data._id)
        return res.send(SellerError.Success(seller))
    } catch (e) {
        return next(e)
    }
}


export async function sellerCountHandler(req, res, next){
    try{
        const sellerCount = await sellerService.Count()
        return res.send(SellerError.Success(sellerCount))
    }catch(e){
       return next(e)
    }   
}




export async function ClientCountHandler(req, res, next){
    try{
        const ClientCount = await clientService.Count()
        return res.send(ClientError.Success(ClientCount))
    }catch(e){
       return next(e)
    }   
}

export async function SellerProductCountHandler(req, res, next){
    try{
        const sellerId = await validateIt(req.params, SellerDto, DtoGroups.GET_BY_ID)
        const productCount = await sellerService.productCount(sellerId._id)
        return res.send(SellerError.Success(productCount))
    }catch(e){
       return next(e)
    }
}