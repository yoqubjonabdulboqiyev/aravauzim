import { ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions, Types } from "mongoose";
import { Collections } from "../../constant/collections";
import { EmployeeError } from "../../db/model/admin/employee/employee.error";
import { Employee, EmployeeModel } from "../../db/model/admin/employee/employee.model";
import { EmployeeDto } from "../../validation/dto/admin/employee.dto";
import { PagingDto } from "../../validation/dto/paging.dto";
import { BaseServise } from "../base.service";



export class EmployeeService extends BaseServise<Employee>{
    constructor(model: ModelType<Employee>) {
        super(model);
    }


    public async findByIdError(id) {
        const $match = {
            $match: {
                _id: new Types.ObjectId(id)
            }
        }
        const $lookup = {
            $lookup: {
                from: Collections.ROLE,
                localField: "roleId",
                foreignField: "_id",
                as: "role"
            }
        }
        const $unwindRole = {
            $unwind: {
                path: "$role",
                preserveNullAndEmptyArrays: true,
            },
        };
        const $projection = {
            $project: {
                _id: 1,
                imgUrl: 1,
                lastName: 1,
                firstName: 1,
                password: 1,
                phoneNumber: 1,
                active: 1,
                role: {
                    _id: 1,
                    name: 1,
                },
            },
        };
        const $pipline = [$match, $lookup, $unwindRole, $projection];
        let admin = await this.aggregate($pipline);
        if (!admin) throw EmployeeError.NotFound(id);
        return admin;
    }

    public async findByPhoneNumber(phoneNumber: string) {
        const $match = {
            $match: {
                phoneNumber: phoneNumber
            }
        }
        const $lookup = {
            $lookup: {
                from: Collections.ROLE,
                localField: "roleId",
                foreignField: "_id",
                as: "role"
            }
        }
        const $unwindRole = {
            $unwind: {
                path: "$role",
                preserveNullAndEmptyArrays: true,
            },
        };
        const $projection = {
            $project: {
                _id: 1,
                lastName: 1,
                firstName: 1,
                password: 1,
                phoneNumber: 1,
                imgUrl: 1,
                active: 1,
                role: {
                    _id: 1,
                    name: 1,
                },
            },
        };
        const $pipline = [$match, $lookup, $unwindRole, $projection];

        let employee = await (await this.aggregate($pipline)).shift();
        if (!employee) throw EmployeeError.NotFound(phoneNumber)
        return employee;
    }


    public async getPaging<T>(dto: PagingDto) {
        let query: any = { isDeleted: false };

        const $lookupRole = {
            $lookup: {
                from: Collections.ROLE,
                foreignField: "_id",
                localField: "roleId",
                as: "role",
            },
        };

        const $unwindRole = {
            $unwind: {
                path: "$role",
                preserveNullAndEmptyArrays: true,
            },
        };

        const $projection = {
            $project: {
                _id: 1,
                lastName: 1,
                firstName: 1,
                password: 1,
                phoneNumber: 1,
                imgUrl: 1,
                active: 1,
                role: {
                    _id: 1,
                    name: 1,
                },
            },
        };

        const $pipline = [$lookupRole, $unwindRole, $projection];

        return await this.findPaging(query, dto, $pipline);
    }

    public async createEmployee(data: EmployeeDto) {
        try {
            const employee = await super.create(data)
            return await this.findByIdError(employee._id)
        } catch (e) {
            if (e.code == 11000) throw EmployeeError.AlreadyExists(Object.keys(e.keyPattern))
            return e
        }
    }
    public async update(id, data: EmployeeDto, options?: QueryOptions) {
        try {
            await this.findByIdError(id)
            const employee = await super.updateOne(id, data, options)
            return await this.findByIdError(employee._id)
        } catch (e) {
            if (e.code == 11000) throw EmployeeError.AlreadyExists(Object.keys(e.keyPattern))
            return e
        }
    }

    public async deleteEmployee(id) {
        await this.findByIdError(id)
        const deleteEmployee = await this.updateOne(id, { isDeleted: true })
        return deleteEmployee._id
    }

}


export const employeeService = new EmployeeService(EmployeeModel)