## SUPPORT-X

## Introduction

Support-x is a simple customer support platform.

## Overview

This app allows users do the following

- Create a support request via a form in the home page.
- Create a user profile based on the support request email.

## Tech Stack (Dependencies)

Our tech stack will include the following:

- [**NodeJS (version 18.12.1 )**](https://nodejs.org/en/download) Javascript runtime environment.
- [**AdonisJS**](https://docs.adonisjs.com/guides/installation) A full-stack NodeJS Framework
- [**Postgres**](https://www.postgresql.org/) and [ElephantDB](https://www.elephantsql.com/) as the Database of choice

### 2. Installation

You must have [NodeJs](https://nodejs.org/en/download) installed locally on your machine to run this application. Follow the instructions below to install this application.

- Fork and Clone this repo to your machine
- CD into the installed folder on your terminal
- Run `npm install`
- Configure your `.env` file
- Run `npm run dev` to start the local server

## API Reference

### Base URL

At present this app can only be run locally. The backend is hosted at the default, `http://127.0.0.1:3333/` .

### Authentication

The version of this application does has no authentication mechanism, method or requirements.

### Frontend Route

> **GET /**

Gets the home route, where you can access the support request form from your browser.

### Endpoint library

> **POST /support**

Adds a new support request to the database and returns the user input as a JSON object if successful. It also creates a new user via /new-user endpoint if the email input does not exist on the database.

- Request arguments: This endpoint requires a value for the following keys: first_name, last_name, email, title, message, file e.g

```
{
"first_name": "John",
"last_name": "Doe",
"email": "john@email.com",
"title": 'need help',
"message": 'request help regarding ...'
"file": 'jpg, gif, png',
}
```

It will return an object like below:

```{
"id": 2
"first_name": "John",
"last_name": "Doe",
"email": "john@doe.com",
"title": "need help",
"message": "request help regarding ...",
"user_id": 2,
"file": "",
"created_at": "2023-12-22T14:21:46.105+01:00",
"updated_at": "2023-12-22T14:21:46.105+01:00",
}
```

> **POST /support/request**

Gets a single support request from the databse with a the Id input.

- Request argument: There is only one request argument, support request id.

```
{
"id": 2
}
```

It will return a object like this:

```
{
 "id": 2
"first_name": "John",
"last_name": "Doe",
"email": "john@email.com",
"title": 'need help',
"message": 'request help regarding ...'
"file": 'jpg, gif, png',
}
```

> **POST /user**

Creates a new user if a user with the same email does not exist. Otherwise it gets the user with the email.

- Request arguments: fullName, email. e.g

```
{
"full_name": "John Doe",
"email": "john@email.com",
}
```

It will return a similar object with the id and timestamps.

**GET /categories**

- Fetches all users with their support requests preoloaded
- Request arguments: None

```
[
{
"id": 1,
"email": "janedoe@email.com",
"created_at": "2023-12-22T10:27:05.565+01:00",
"updated_at": "2023-12-22T10:27:05.566+01:00",
"full_name": "jane doe",
"support_requests": [
{
"id": 1,
"user_id": 1,
"first_name": "jane",
"last_name": "doe",
"title": "need help",
"message": "need to reset file to origin",
"file": "tmp/1/Screenshot 2023-05-18 204751.png",
"created_at": "2023-12-22T10:27:05.842+01:00",
"updated_at": "2023-12-22T10:27:05.842+01:00",
"email": "janedoe@email.com"
}
]
},
{
"id": 2,
"email": "john@doe.com",
"created_at": "2023-12-22T14:21:45.795+01:00",
"updated_at": "2023-12-22T14:21:45.796+01:00",
"full_name": "John Doe",
"support_requests": [
{
"id": 2,
"user_id": 2,
"first_name": "John",
"last_name": "Doe",
"title": "need help",
"message": "request help regarding ...",
"file": "",
"created_at": "2023-12-22T14:21:46.105+01:00",
"updated_at": "2023-12-22T14:21:46.105+01:00",
"email": "john@doe.com"
}
]
}
]
```

## Testing

To test the endpoints and file uploads:

- Run `npm run test` or `node ace test` on the the terminal in the projects root directory.

## Contributors

- Edori Atiri contributed to this project,
