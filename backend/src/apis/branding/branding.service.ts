import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreateBrandingDto } from 'apis/branding/dto/create-branding.dto'
import { UpdateBrandingDto } from 'apis/branding/dto/update-branding.dto'
import { BrandingEntity } from 'apis/branding/entity/branding.entity'
import { Branding } from 'apis/branding/models/branding.schema'
import { IListingInput, IListReturn } from 'shared/common/interfaces/list'
import { COLLECTION, ERROR } from 'shared/constants'

@Injectable()
export class BrandingService {
    constructor(
        @InjectModel(COLLECTION.BRANDING)
        private readonly BrandingModel: Model<Branding>
    ) {}

    async createBranding(doc: CreateBrandingDto): Promise<BrandingEntity> {
        const createdBranding = await new this.BrandingModel(doc).save()
        return new BrandingEntity(createdBranding)
    }

    async updateBranding(
        id: string,
        doc: UpdateBrandingDto
    ): Promise<BrandingEntity> {
        await this.getExistBranding(id)
        const updatedData = await this.BrandingModel.findOneAndUpdate(
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

        return new BrandingEntity(updatedData)
    }

    async deleteBranding(id: string): Promise<void> {
        await this.getExistBranding(id)
        await this.BrandingModel.findOneAndUpdate(
            {
                _id: id,
                deleted: false,
            },
            { deleted: true },
            { new: true }
        )
    }

    async getBrandingById(id: string): Promise<BrandingEntity> {
        const existBranding = await this.BrandingModel.findOne({
            _id: id,
            deleted: false,
        })
        if (!existBranding) {
            throw new BadRequestException(ERROR.CAN_NOT_FIND_BRANDING)
        }

        return new BrandingEntity(existBranding)
    }

    async getBrandingWithPagination(
        args: IListingInput,
        queries: any,
        sort: any
    ): Promise<IListReturn<BrandingEntity>> {
        const { limit, offset } = args.pagination
        const [brandings, total]: [Branding[], number] = await Promise.all([
            await this.BrandingModel.find(queries)
                .sort(sort)
                .limit(limit)
                .skip(offset),
            await this.BrandingModel.count(queries),
        ])

        return {
            data: brandings.map((p) => {
                return new BrandingEntity(p)
            }),
            meta: {
                limit: limit,
                offset: offset,
                total: total,
                totalPages: Math.ceil(total / args.pagination.limit),
            },
        }
    }

    async getExistBranding(id: string): Promise<Branding> {
        const existBranding = await this.BrandingModel.findById(id)
        if (!existBranding) {
            throw new BadRequestException(ERROR.CAN_NOT_FIND_BRANDING)
        }

        if (existBranding.deleted) {
            throw new BadRequestException(ERROR.THIS_DATA_HAS_BEEN_DELETED)
        }

        return existBranding
    }
}
