import { SortType } from 'shared/constants'

export interface Pagination {
    limit: number
    offset: number
}

export interface Meta {
    limit: number
    offset: number
    total: number
    totalPages?: number
}

export interface IListReturn<T> {
    data: T[]
    meta: Meta
}

export interface IListSearchReturn<T> {
    results?: T[]
    total?: number
}

export interface ISearchReturn<T> {
    data: T
}

export interface Where {
    [fieldName: string]: string
}

export interface Sort {
    [fieldName: string]: number
}

export interface IListRequest {
    query?: Where
    sort?: Sort
    pagination: Pagination
}
export interface ISearchInput {
    fieldName: string
    keyword: string
}
export interface WhereInput {
    [fieldName: string]: string
}
export interface SortInput {
    sortBy: string
    sortType: SortType
}
export interface IListingInput {
    where?: WhereInput
    search?: ISearchInput[]
    sort?: SortInput
    pagination: Pagination
}
