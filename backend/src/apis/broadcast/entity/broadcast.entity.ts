import { Broadcast } from 'apis/broadcast/models/broadcast.schema'

export interface IReaction {
    [key: string]: number
}

export class BroadcastEntity {
    id: string
    message: string
    amount: number
    time: Date
    reaction: IReaction
    username: string

    constructor(partial: Partial<Broadcast>) {
        if (partial) {
            this.id = partial.id
            this.message = partial.message
            this.amount = partial.amount
            this.time = partial.time
        }
    }
}
