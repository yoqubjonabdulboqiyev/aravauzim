import { ModelType } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";
import { Collections } from "../../constant/collections";
import { ClientError } from "../../db/model/client/client.error";
import { Client, ClientModel } from "../../db/model/client/client.model";
import { PagingDto } from "../../validation/dto/paging.dto";
import { BaseServise } from "../base.service";




export class ClientService extends BaseServise<Client>{
    constructor(model: ModelType<Client>) {
        super(model)
    }

    public async findByIdError(id) {
        const $match = {
            $match: {
                _id: new Types.ObjectId(id)
            }
        }
        const $projection = {
            $project: {
                _id: 1,
                lastName: 1,
                firstName: 1,
                password: 1,
                phoneNumber: 1,
                gender: 1,
                telegrammUserName: 1,
                imgUrl: 1,
                active: 1,
            },
        };
        const $pipline = [$match, $projection];

        let client = await this.aggregate($pipline);
        if (!client) throw ClientError.NotFound(id);
        return client;
    }

    public async createClient(data) {
        try {
            const client = await this.create(data)
            return await this.findByIdError(client._id)
        }
        catch (e) {
            if (e.code == 11000) throw ClientError.AlreadyExists(data)
            return e
        }
    }

    public async updateClient(id, data) {
        try {
            await this.findByIdError(id)
            const client = await this.updateOne(id, data)
            return await this.findByIdError(client._id)
        }
        catch (e) {
            if (e.code == 11000) throw ClientError.AlreadyExists(data)
            return e
        }
    }

    public async deleteClient(id) {
        await this.findByIdError(id)
        const client = await this.deleteOne(id)
        return client._id
    }

    public async getPaging<T>(dto: PagingDto) {
        let query: any = { isDeleted: false }
        const $projection = {
            $project: {
                _id: 1,
                lastName: 1,
                firstName: 1,
                password: 1,
                phoneNumber: 1,
                address: 1,
                telegrammUserName: 1,
                imgUrl: 1,
                active: 1,
            },
        };
        const $pipeline = [$projection];
        return await this.findPaging(query, dto, $pipeline)
    }

    public async Count() {
        const $match = {
            $match: {
                isDeleted: false
            }
        }
        const count = await this.aggregate([$match])
        return count.length
    }
    public async findByPhoneNumber(phoneNumber: string) {
        const $match = {
            $match: {
                phoneNumber: phoneNumber
            }
        }
        const $projection = {
            $project: {
                _id: 1,
                lastName: 1,
                firstName: 1,
                password: 1,
                phoneNumber: 1,
                gender: 1,
                telegrammUserName: 1,
                imgUrl: 1,
                active: 1,
            },
        };
        const $pipline = [$match,$projection];

        let client = await (await this.aggregate($pipline)).shift();
        if (!client) throw ClientError.NotFound(phoneNumber);
        return client;
    }

}

export const clientService = new ClientService(ClientModel)   