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
    Address,
    Deadline,
    Mosaic,
    MosaicId,
    NetworkType,
    PlainMessage,
    TransactionHttp,
    TransferTransaction,
    UInt64,
    XEM,
    Message,
  } from "nem2-sdk";
  
  // 01 - Create Transfer Transaction
  const recipientAddress = Address.createFromRawAddress("address-of-recipient");
  
  const transferTransaction = TransferTransaction.create(
    Deadline.create(),
    recipientAddress,
    [
      new Mosaic(
        new MosaicId("your-organisation:ticket-for-event"),
        UInt64.fromUint(10)
      ),
    ],
    PlainMessage.create("Your ticket for the event."),
    NetworkType.MIJIN_TEST
  );
  
  // 02 - Signing the transaction
  const privateKey = String(process.env.PRIVATE_KEY);
  
  const account = Account.createFromPrivateKey(
    privateKey,
    NetworkType.MIJIN_TEST
  );
  
  const signedTransaction = account.sign(transferTransaction);
  
  // 03 - Announcing the transaction
  const transactionHttp = new TransactionHttp("http://94.130.186.228:3000");
  
  transactionHttp.announce(signedTransaction).subscribe(
    (x: any) => console.log(x),
    (err: any) => console.error(err)
  );
  