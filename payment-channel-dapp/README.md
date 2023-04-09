# Payment Channel dApp

A basic Express web application using the Pug template engine to enable efficient Ethereum micropayments.

This project utilizes on payment channels for content access control. It allows users to access specific content on a website by opening a payment channel with the content provider and signing off transactions within the channel. The system uses MetaMask as a browser plugin to interact with the Ethereum blockchain, enabling users to open channels, sign transactions, and make payments. The backend handles channel management, content pricing, and tracking user payments. Users can log in using their Ethereum addresses and access content after paying the required amount. The payment channels can be closed by the recipient (content provider) once the channel balance is confirmed.

## Payment Channel Tickets

Tickets form the basis for payment channels. These withdrawal permissions guarantee the recipient that he or she can get money from the payment channel without having to carry out a paid transaction on the blockchain.
