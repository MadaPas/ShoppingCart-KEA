# Documentation

The application is not finished yet and is being gradually updated.

## Setup instructions

**Prerequisites**
- npm
- node.js
- mongoDb
- create .env file under server directory

**.env file contents**
- DATABASE_URL
- PORT={port} (e.g. we use 8080)
- NODE_ENV=development
- JWT_SECRET={your_secret_here}
- JWT_EXPIRE={token_expiration} (e.g. '30d')

**Running the app**
1. Navigate to the folder server folder
2. Run `npm install` to install all dependencies
3. Run `npm start` to start the backend API server 
4. Navigate to http://localhost:8080/api for the api 

**Things to note**
- Trying to sign in with a user created from the population scripts will not work due to the password hashing mechanism of the API user creation controller
- To sign in, add a new user with the Postman API testing application

**Data to use with Postman to sign in**
1. POST a new user to the API route http://localhost:8080/api/users/signup
    - {
        "role_id": "607d67fe24b72122ed6bcd81",
        "first_name": "new",
        "last_name": "user",
        "email": "newuser@gmail.com",
        "password": "newpass"
       }
    
2. POST sign in credentials to sign in with the new user at http://localhost:8080/api/users/signin
    - {
        "email": "newuser@gmail.com",
        "password": "newpass"
       }   