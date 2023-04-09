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
    CosignatureSignedTransaction,
    CosignatureTransaction,
    Listener,
    NetworkType,
    PublicAccount,
    Transaction,
    TransactionHttp,
    TransferTransaction,
    XEM,
    //@ts-ignore
  } from "nem2-sdk";
  //@ts-ignore
  import { filter, map, mergeMap } from "rxjs/operators";
  
  const validTransaction = (
    transaction: Transaction,
    publicAccount: PublicAccount
  ): boolean => {
    return (
      transaction instanceof TransferTransaction &&
      transaction.signer.equals(publicAccount) &&
      transaction.mosaics.length == 1 &&
      transaction.mosaics[0].id.equals(XEM.MOSAIC_ID) &&
      transaction.mosaics[0].amount.compact() <
        XEM.createRelative(10).amount.compact()
    );
  };
  
  const cosignAggregateBondedTransaction = (
    transaction: AggregateTransaction,
    account: Account
  ): CosignatureSignedTransaction => {
    const cosignatureTransaction = CosignatureTransaction.create(transaction);
    return account.signCosignatureTransaction(cosignatureTransaction);
  };
  
  const privateKey = "your-private-key";
  const account = Account.createFromPrivateKey(
    privateKey,
    NetworkType.MIJIN_TEST
  );
  
  const nodeUrl = "http://94.130.186.228:3000";
  const transactionHttp = new TransactionHttp(nodeUrl);
  const listener = new Listener(nodeUrl);
  
  listener.open().then(() => {
    listener
      .aggregateBondedAdded(account.address)
      .pipe(
        filter((_: { innerTransactions: string | any[] }): boolean => {
          return _.innerTransactions.length == 2;
        }),
        filter(
          (_: { signedByAccount: (arg0: any) => any }) =>
            !_.signedByAccount(account.publicAccount)
        ),
        filter(
          (_: { innerTransactions: any[] }): boolean =>
            validTransaction(_.innerTransactions[0], account.publicAccount) ||
            validTransaction(_.innerTransactions[1], account.publicAccount)
        ),
        map((transaction: any) =>
          cosignAggregateBondedTransaction(transaction, account)
        ),
        mergeMap((cosignatureSignedTransaction: any) =>
          transactionHttp.announceAggregateBondedCosignature(
            cosignatureSignedTransaction
          )
        )
      )
      .subscribe(
        (announcedTransaction: any) => console.log(announcedTransaction),
        (err: any) => console.error(err)
      );
  });
  