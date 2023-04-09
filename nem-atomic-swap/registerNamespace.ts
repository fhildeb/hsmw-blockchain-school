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
    Deadline,
    NetworkType,
    RegisterNamespaceTransaction,
    TransactionHttp,
    UInt64,
  } from "nem2-sdk";
  
  const transactionHttp = new TransactionHttp("http://94.130.186.228:3000");
  
  const privateKey = "enter-your-key-here";
  const account = Account.createFromPrivateKey(
    privateKey,
    NetworkType.MIJIN_TEST
  );
  
  const namespaceName = "your-organisation";
  
  const registerNamespaceTransaction =
    RegisterNamespaceTransaction.createRootNamespace(
      Deadline.create(),
      namespaceName,
      UInt64.fromUint(1000),
      NetworkType.MIJIN_TEST
    );
  
  const signedTransaction = account.sign(registerNamespaceTransaction);
  
  transactionHttp.announce(signedTransaction).subscribe(
    (x: any) => console.log(x),
    (err: any) => console.error(err)
  );
  