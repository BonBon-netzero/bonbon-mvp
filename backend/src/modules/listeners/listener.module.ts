import { Module } from '@nestjs/common'
import { CheckBroadcastService } from 'modules/listeners/check-broadcast.service'
import { TransactionListenerService } from 'modules/listeners/transaction-listener.service'

@Module({
    imports: [],
    providers: [TransactionListenerService, CheckBroadcastService],
})
export class ListenerModule {}
