# DRaport

React Native application for sales representatives.

## About

Mobile application intending to help sales representatives in their daily work by helping them with creating daily raports. It has certain type of sales represantative in mind that has to drive from client to client, take their orders and forward them to warehouses.

## Features

### GUS site scraping

Application fetches data for clients from Baza Internetowa Regon by employing web scraping.

![Client details scraped from BIR](/doc/assets/briscrap.png "Client details from BRI")

It works by extracting user key from GUS website.
Then it uses key to establish session, and get client details. \
User has to input NIP and simply press the fill data button.

![Client details](/doc/assets/clientdetails.png "Client details")

## Planned features

- Showing nearest clients.
- Exporting daily raport to xml file.
- Sending orders to warehouse by email or sms.

---

## Instalation

Download archive and extract in appropriate location. \
Or run:

```
git clone https://github.com/SanglierF/DRaport.git
```

Next run:

```
yarn install
```

And finally:

```
expo start
```

### Requirements

- NodeJS 16
- Expo SDK 44.0.0
- **TypeORM 0.2.44** (other versions have troubles working)
- React Hook Form 7.29.0
- Axios 0.26.0

## Building APK

Use eas to build apk.

## Troubleshooting

Sometimes while using Expo Go it won't connect to Expo cli, which necessites reinstallation of Expo Go application.
