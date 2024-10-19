import { Reaction } from 'apis/reaction/models/reaction.schema'
import { REACTION_TYPE } from 'shared/constants'

export class ReactionEntity {
    id: string
    broadcastId: string
    type: REACTION_TYPE

    constructor(partial: Partial<Reaction>) {
        if (partial) {
            this.id = partial.id
            this.broadcastId = partial.broadcastId
            this.type = partial.type
        }
    }
}
