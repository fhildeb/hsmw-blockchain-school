/*
 *
 * Copyright 2018 NEM
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */


import {
    Account,
    AggregateTransaction,
    Deadline,
    Listener,
    LockFundsTransaction,
    Mosaic,
    MosaicId,
    NetworkType,
    PlainMessage,
    PublicAccount,
    TransactionHttp,
    TransferTransaction,
    UInt64,
    XEM
} from 'nem2-sdk';

import {filter, mergeMap} from "rxjs/operators";

// 01 - Setup
const nodeUrl = 'http://94.130.186.228:3000';
const transactionHttp = new TransactionHttp(nodeUrl);
const listener = new Listener(nodeUrl);

const yourPrivateKey = 'your-private-key';
const yourAccount = Account.createFromPrivateKey(yourPrivateKey, NetworkType.MIJIN_TEST);

const ticketBuyersPublicKey = 'ticket-buyers-public-key';
const ticketBuyersPublicAccount = PublicAccount.createFromPublicKey(ticketBuyersPublicKey, NetworkType.MIJIN_TEST);

const ticketBuyerToYouTx = TransferTransaction.create(
    Deadline.create(),
    yourAccount.address,
    [XEM.createRelative(100)],
    PlainMessage.create('sending 100 nem:xem for ticket'),
    NetworkType.MIJIN_TEST);

const youToTicketBuyerTx = TransferTransaction.create(
    Deadline.create(),
    ticketBuyersPublicAccount.address,
    [new Mosaic(new MosaicId('your-organisation:ticket-for-event'), UInt64.fromUint(1))],
    PlainMessage.create('sending 1 ticket'),
    NetworkType.MIJIN_TEST);

// 02 - Aggregate Transaction
const aggregateTransaction = AggregateTransaction.createBonded(Deadline.create(),
    [youToTicketBuyerTx.toAggregate(yourAccount.publicAccount),
        ticketBuyerToYouTx.toAggregate(ticketBuyersPublicAccount)],
    NetworkType.MIJIN_TEST);

const signedTransaction = yourAccount.sign(aggregateTransaction);

const lockFundsTransaction = LockFundsTransaction.create(
    Deadline.create(),
    XEM.createRelative(10),
    UInt64.fromUint(480),
    signedTransaction,
    NetworkType.MIJIN_TEST);

const lockFundsTransactionSigned = yourAccount.sign(lockFundsTransaction);

listener.open().then(() => {

    transactionHttp
        .announce(lockFundsTransactionSigned)
        .subscribe(x => console.log(x), err => console.error(err));

    listener
        .confirmed(yourAccount.address)
        .pipe(
            filter((transaction) => transaction.transactionInfo !== undefined
                && transaction.transactionInfo.hash === lockFundsTransactionSigned.hash),
            mergeMap(ignored => transactionHttp.announceAggregateBonded(signedTransaction))
        )
        .subscribe(announcedAggregateBonded => console.log(announcedAggregateBonded),
            err => console.error(err));
});