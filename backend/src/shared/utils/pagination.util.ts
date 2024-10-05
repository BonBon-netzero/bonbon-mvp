import { PaginationDto } from 'shared/common/dto'
import { SortType } from 'shared/constants'

export class PaginationUtil {
    static prepareDefaultBasicQuery(
        pagination: PaginationDto,
        sortBy = 'createdAt',
        sortType = SortType.desc
    ) {
        const args = {
            pagination,
        }
        if (sortBy.length === 0) {
            sortBy = 'createdAt'
        }
        let sort: any = { [sortBy]: sortType }
        if (sortBy) {
            sort = { [sortBy]: sortType === SortType.asc ? 1 : -1 }
        }
        return { args, sort }
    }
}
