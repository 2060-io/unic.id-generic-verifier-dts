This is a [Hologram](https://hologram.zone/) web app where you can make a presentation request credential demo using Hologram Mobile App

## Getting Started

## First of all

Install dependencies

```bash
yarn install
```

## Run in developer mode

```bash
yarn dev
```

## Run in production mode

```bash
yarn build && yarn start
```

## Configuration

At the moment, all configuration is done by environment variables. While most of them are optional for development, this two (`CREDENTIAL_DEFINITION_ID` and `SERVICE_AGENT_ADMIN_BASE_URL`) are mandatory for production and test deployments.

| Variable                     | Description                                   | Default value                                                                                                        |
| ---------------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| NEXT_PUBLIC_BASE_URL         | Public URL without port where app is deployed | http://localhost:3000                                                                                 |
| NEXT_PUBLIC_PORT             | Port where app is listening                   | 3000                                                                                                                 |
| CREDENTIAL_DEFINITION_ID     | Unique identifier or Credential types         | `none`                                                                                                               |
| SERVICE_AGENT_ADMIN_BASE_URL | Service agent base URL                        | `none`                                                                                                               |
| ISSUER_DID | Optional public DID to let users connect to get their credentials in case they don't have any compatible credential                       | `none`                                                                                                               |
| ISSUER_LABEL | A label to show in the invitation to credential issuer                       | Issuer                                                  |
| ISSUER_IMAGE_URL | An URL pointing to an image to show in the invitation to credential issuer                       | `none`                                                                                                               |
|

**Note:** By default, it is recommended to use the following values for `CREDENTIAL_DEFINITION_ID` and `SERVICE_AGENT_ADMIN_BASE_URL`:

- `CREDENTIAL_DEFINITION_ID`: `did:web:chatbot-demo.dev.2060.io?service=anoncreds&relativeRef=/credDef/HngJhYMeTLTZNa5nJxDybmXDsV8J7G1fz2JFSs3jcouT`
- `SERVICE_AGENT_ADMIN_BASE_URL`: `https://a.chatbot-demo.dev.2060.io`

These values point to the chatbot demo and ensure correct functionality in the production environment.

## About this web app

This app was built using [Next.js framework](https://nextjs.org) and [Socket.IO](https://socket.io) for its web socket server.

## How to use this web app

1. First of all you need to have Hologram mobile app installed in your device.

2. Make sure you have a credential emitted by ChatBot Service. Otherwise, you wont be able to present any credential. If you do not have it, request it to chat bot service and accept it

3. Scan QR code of this web app in your Hologram app and present the credential that mobile app ask you. After present it you should see page screen as the next image

![Present credential image](public/images/presented.png)
