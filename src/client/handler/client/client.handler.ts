import { ClientError } from "../../../common/db/model/client/client.error";
import { clientService } from "../../../common/service/client/client.service";
import { ClientDto } from "../../../common/validation/dto/client/client.dto";
import { PagingDto } from "../../../common/validation/dto/paging.dto";
import { DtoGroups } from "../../../common/validation/dtoGroups";
import { validateIt } from "../../../common/validation/validateIt";



export async function createClientHandler(req, res, next) {
    try {
        const data = await validateIt(req.body, ClientDto, DtoGroups.CREATE);
        const Client = await clientService.createClient(data)
        return res.send(ClientError.Success(Client))
    } catch (e) {
        return next(e)
    }
}


export async function getByIdClientHandler(req, res, next) {
    try {
        const data = await validateIt(req.client._id, ClientDto, DtoGroups.GET_BY_ID)
        const client = await clientService.findByIdError(data._id)
        return res.send(ClientError.Success(client))
    } catch (e) {
        return next(e)
    }
}


export async function updateClientHandler(req, res, next) {
    try {
        const data = await validateIt({ ...req.client._id, ...req.body }, ClientDto, DtoGroups.UPDATE)
        const client = await clientService.updateClient(data._id, data)
        return res.send(ClientError.Success(client))
    } catch (e) {
        return next(e)
    }
}

export async function deleteClientHandler(req, res, next) {
    try {
        const data = await validateIt(req.client._id, ClientDto, DtoGroups.DELETE)
        const client = await clientService.deleteClient(data._id)
        return res.send(ClientError.Success(client))
    } catch (e) {
        return next(e)
    }
}



