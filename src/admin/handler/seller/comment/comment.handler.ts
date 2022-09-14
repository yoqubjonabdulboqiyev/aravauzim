import { CommentError } from "../../../../common/db/model/seller/comment/comment.error"
import { sellerCommentServise } from "../../../../common/service/seller/comment/comment.service"
import { PagingDto } from "../../../../common/validation/dto/paging.dto"
import { SellerDto } from "../../../../common/validation/dto/seller/seller.dto"
import { DtoGroups } from "../../../../common/validation/dtoGroups"
import { validateIt } from "../../../../common/validation/validateIt"

export async function getPagingSellerCommentHandler(req, res, next) {
    try {
        const sellerId = await validateIt(req.params, SellerDto, DtoGroups.GET_BY_ID)
        const data = await validateIt(req.query, PagingDto, DtoGroups.PAGENATION)
        const comments = await sellerCommentServise.getPagingSellerComment(data, sellerId._id)
        if (!comments) throw CommentError.NotFound()
        return res.send(CommentError.Success(comments))
    } catch (e) {
        return next(e)
    }
}

export async function SellerCommentCountHandler(req, res, next){
    try{
        const sellerId = await validateIt(req.params, SellerDto, DtoGroups.GET_BY_ID)
        const commentCount = await sellerCommentServise.commentCount(sellerId._id)
        return res.send(CommentError.Success(commentCount))
    }catch(e){
       return next(e)
    }
}

