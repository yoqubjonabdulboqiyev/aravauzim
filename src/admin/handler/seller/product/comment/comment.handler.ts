import { Roles } from "../../../../../common/constant/roles"
import { CommentError } from "../../../../../common/db/model/seller/product/comment/comment.error"
import { roleService } from "../../../../../common/service/admin/role.service"
import { productCommentServise } from "../../../../../common/service/seller/product/comment/comment.service"
import { PagingDto } from "../../../../../common/validation/dto/paging.dto"
import { DtoGroups } from "../../../../../common/validation/dtoGroups"
import { validateIt } from "../../../../../common/validation/validateIt"



export async function getPagingProductCommentHandler(req, res, next) {
    try {
        const data = await validateIt(req.query, PagingDto, DtoGroups.PAGENATION)
        const comments = await productCommentServise.getPaging(data)
        if (!comments) throw CommentError.NotFound()
        return res.send(CommentError.Success(comments))
    } catch (e) {
        return next(e)
    }
}
