import { Module } from '@nestjs/common'
import { SolveBroadcastService } from 'modules/listeners/solve-broadcast.service'
import { TransactionListenerService } from 'modules/listeners/transaction-listener.service'

@Module({
    imports: [],
    providers: [TransactionListenerService, SolveBroadcastService],
})
export class ListenerModule {}
