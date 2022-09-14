import { SellerError } from "../../common/db/model/seller/seller.error";
import { sellerService } from "../../common/service/seller/seller.service";
import { jwt } from "../../common/utils/jwt";





export async function auth(req, res, next) {
    try {
        const { phoneNumber } = jwt.verify(req.headers.token)
        const seller = await sellerService.findByPhoneNumber(phoneNumber)
        if (seller.phoneNumber != phoneNumber) throw SellerError.InvalidToken()
        req.seller = seller;
        return next();

    } catch (e) {
        throw e;
    }
}