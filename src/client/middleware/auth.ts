import { ClientError } from "../../common/db/model/client/client.error";
import { clientService } from "../../common/service/client/client.service";
import { jwt } from "../../common/utils/jwt";





export async function auth(req, res, next) {
    try {
        const { phoneNumber } = jwt.verify(req.headers.token)
        const client = await clientService.findByPhoneNumber(phoneNumber)
        if (client.phoneNumber != phoneNumber) throw ClientError.InvalidToken()
        req.client = client;
        return next();

    } catch (e) {
        throw e;
    }
}