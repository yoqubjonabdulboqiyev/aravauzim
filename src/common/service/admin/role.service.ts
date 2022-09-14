import { ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions, Types } from "mongoose"
import { EmployeeError } from "../../db/model/admin/employee/employee.error";
import { RoleError } from "../../db/model/admin/role/role.error";
import { Role, RoleModel } from "../../db/model/admin/role/role.model";
import { RoleDto } from "../../validation/dto/admin/role.dto";
import { PagingDto } from "../../validation/dto/paging.dto";
import { BaseServise } from "../base.service";


class RoleService extends BaseServise<Role>{
    constructor(model: ModelType<Role>) {
        super(model);
    }

    public async findByIdError(id) {
        const $match = {
            $match: {
                _id : new Types.ObjectId(id),
                isDeleted: false
            }
        }
        const $project = {
            $project: {
                __v: 0,
                isDeleted: 0,
            }
        }
        const $pipeline = [$match, $project]
        const role = await this.aggregate($pipeline)
        if (!role) throw RoleError.NotFound(id);
        return role;
    }

    public async hasAccess(id: string, access: string) {
        const role = await this.findById(id);

        if (!role) throw RoleError.NotFound(id);

        if (!role[access] || role.isDeleted) throw EmployeeError.NotEnoughPermission();
    }

    public async getPaging<T>(dto: PagingDto) {
        let query = {
            isDeleted: false,
        }

        const $project = {
            $project: {
                isDeleted: 0,
                __v: 0
            },
        }
        const $pipeline = [$project]

        return await this.findPaging(query, dto, $pipeline)
    }

    public async createRole(data: RoleDto) {
        try {
            const role = await super.create(data)
            return await this.findByIdError(role._id)
        } catch (e) {
            if (e.code == 11000) throw RoleError.AlreadyExists(Object.keys(e.keyPattern))
            return e
        }
    }


    public async updateRole(id, data: RoleDto, options?: QueryOptions) {
        try {
            await this.findByIdError(id)
            const role =  await super.updateOne(id, data, options)
            return await this.findByIdError(role._id)
        } catch (e) {
            if (e.code == 11000) throw RoleError.AlreadyExists(Object.keys(e.keyPattern))
            return e
        }
    }

    public async deleteRole(id) {
        await this.findByIdError(id)
        const deleteRole = await this.updateOne(id, { isDeleted: true })
        return deleteRole._id
    }
}



export const roleService = new RoleService(RoleModel);