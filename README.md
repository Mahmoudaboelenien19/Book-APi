# Book API

A RESTful API for managing books.

## Table of Contents

- [Features](#features)
- [Authentication and Authorization](#authentication-and-authorization)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Features

- Create, retrieve, update, and delete books.
- Authentication and authorization for secure access.

## Authentication and Authorization

The Book API implements authentication and authorization to ensure secure access to the endpoints. It uses JSON Web Tokens (JWT) for authentication.

## Getting Started

To get started with the Book API, follow these steps:

1. Clone the repository:

```
git clone https://github.com/Mahmoudaboelenien19/Book-APi
```

2. Install the dependencies:

3. Configure the environment variables by creating a `.env` file and providing the necessary values:

```
PORT=your _prefered_port
MONGOOSE_URL=mongodb://127.0.0.1:27017/books
BCRYPT_PASS=Your_Bcrypt_secret
SALT=10
ACCESS_TOKEN_SECRET=Your_Prefered_Access_Token
REFRESH_TOKEN_SECRET=Your_Prefered_Refresh_Token
```

4. Start the server:

`npm run start`

## API Endpoints

## Authentication and Authorization

For every route, you should include the access token as a Bearer token in the `Authorization` header of your HTTP requests.

If the access token expires, you can obtain a new access token by including a special header called `ref_token` and passing the refresh token as its value. The API will generate a new access token using the provided refresh token.

Example of including the access token in the `Authorization` header:

```
{
    headears:{
        Authorization: Bearer <ACCESS_TOKEN>,
        ref_token: <REFRESH_TOKEN>
    }
}
```

##### Handling Books

- `GET  /books`: Retrieve a list of all books._(Protected Route: Requires an access token)_
- `POST  /books/create`: Create a new book._(Protected Route: Requires an access token)_
- `GET  /books/:id`: Retrieve a specific book by ID._(Protected Route: Requires an access token)_
- `PATCH /books/:id`: Update an existing book._(Protected Route: Requires an access token)_
- `DELETE   /books/:id`: Delete a book._(Protected Route: Requires an access token)_

##### Handling users

- `POST  /users/create`: create new user.
- `POST  /users/authenticate`:to log in and get refresh and access tokens.

- `DELETE  /users/logout`:to log out _(Protected Route: Requires an access token)_
