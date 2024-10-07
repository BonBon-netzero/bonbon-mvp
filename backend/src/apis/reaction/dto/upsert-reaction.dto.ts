import { IsEnum, IsNotEmpty, IsString } from 'class-validator'

import { REACTION_TYPE } from 'shared/constants'

export class UpsertReactionDto {
    @IsNotEmpty()
    @IsString()
    broadcastId: string

    @IsNotEmpty()
    @IsEnum(REACTION_TYPE)
    type: REACTION_TYPE
}
