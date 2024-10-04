import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreateBrandDto } from 'apis/brand/dto/create-brand.dto'
import { UpdateBrandDto } from 'apis/brand/dto/update-brand.dto'
import { BrandEntity } from 'apis/brand/entity/brand.entity'
import { Brand } from 'apis/brand/models/brand.schema'
import { IListingInput, IListReturn } from 'shared/common/interfaces/list'
import { COLLECTION, ERROR } from 'shared/constants'

@Injectable()
export class BrandService {
    constructor(
        @InjectModel(COLLECTION.BRAND)
        private readonly BrandModel: Model<Brand>
    ) {}

    async createBrand(doc: CreateBrandDto): Promise<BrandEntity> {
        const createdBrand = await new this.BrandModel(doc).save()
        return new BrandEntity(createdBrand)
    }

    async updateBrand(id: string, doc: UpdateBrandDto): Promise<BrandEntity> {
        await this.getExistBrand(id)
        const updatedData = await this.BrandModel.findOneAndUpdate(
            {
                _id: id,
                deleted: false,
            },
            doc,
            { new: true }
        )
        if (!updatedData) {
            throw new BadRequestException(
                ERROR.AN_ERROR_OCCURRED_WHEN_UPDATE_DATA
            )
        }

        return new BrandEntity(updatedData)
    }

    async deleteBrand(id: string): Promise<void> {
        await this.getExistBrand(id)
        await this.BrandModel.findOneAndUpdate(
            {
                _id: id,
                deleted: false,
            },
            { deleted: true },
            { new: true }
        )
    }

    async getBrandById(id: string): Promise<BrandEntity> {
        const existBrand = await this.BrandModel.findOne({
            _id: id,
            deleted: false,
        })
        if (!existBrand) {
            throw new BadRequestException(ERROR.CAN_NOT_FIND_BRAND)
        }

        return new BrandEntity(existBrand)
    }

    async getBrandWithPagination(
        args: IListingInput,
        queries: any,
        sort: any
    ): Promise<IListReturn<BrandEntity>> {
        const { limit, offset } = args.pagination
        const [brands, total]: [Brand[], number] = await Promise.all([
            await this.BrandModel.find(queries)
                .sort(sort)
                .limit(limit)
                .skip(offset),
            await this.BrandModel.count(queries),
        ])

        return {
            data: brands.map((p) => {
                return new BrandEntity(p)
            }),
            meta: {
                limit: limit,
                offset: offset,
                total: total,
                totalPages: Math.ceil(total / args.pagination.limit),
            },
        }
    }

    async getExistBrand(id: string): Promise<Brand> {
        const existBrand = await this.BrandModel.findById(id)
        if (!existBrand) {
            throw new BadRequestException(ERROR.CAN_NOT_FIND_BRAND)
        }

        if (existBrand.deleted) {
            throw new BadRequestException(ERROR.THIS_DATA_HAS_BEEN_DELETED)
        }

        return existBrand
    }
}
