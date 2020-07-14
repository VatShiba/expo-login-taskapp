# Nodejs Express: Registration & Login with JWT + passport-local, Mongoose

Nodejs Express API for register/login, GET user profile example. Using JWT and passport-local as user validation. Database mapping by mongoose.

## Installation


```bash
npm install
```
or
```bash
yarn install
```

## Usage

```test
## TESTING WITH POSTMAN ##

# Register 
POST localhost:3000/register
body:{
    username: "test"
    email: "test@test.com"
    password: "test"   
}

result: Successfully, created user: test

# Login 
POST localhost:3000/login
body:{
    email: "test@test.com"
    password: "test"
}

result:{
    "username": "test",
    "email": "test@test.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMGIwOTQxZGQ1MmUyMGZkZTQ2NzA4NSIsInVzZXJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImV4cCI6MTU5OTc0NjU3NywiaWF0IjoxNTk0NTYyNTc3fQ.3V3BOh_y76LKhKoJn5foeaVMUZI9o9aGK6-J-BcvtHM"
}

# GET TEST USER INDEX PAGE
1. without jwt
GET localhost:3000/user/

result: {
    "message": "Get to the page without JWT"
}

2. with jwt
GET localhost:3000/user/
header:{
    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMGIwOTQxZGQ1MmUyMGZkZTQ2NzA4NSIsInVzZXJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImV4cCI6MTU5OTc0NjU3NywiaWF0IjoxNTk0NTYyNTc3fQ.3V3BOh_y76LKhKoJn5foeaVMUZI9o9aGK6-J-BcvtHM"
}

result: {
    "message": "Get to the page with JWT",
    "credentials": {
        "id": "5f0b0941dd52e20fde467085",
        "username": "test",
        "email": "test@test.com",
        "exp": 1599746022,
        "iat": 1594562022
    }
}

# GET TEST USER PROFILE PAGE
1. without jwt
GET localhost:3000/user/profile

result: {
    "error": {
        "status": 401,
        "message": "Unauthorized"
    }
}

2. with jwt
GET localhost:3000/user/profile
header:{
    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMGIwOTQxZGQ1MmUyMGZkZTQ2NzA4NSIsInVzZXJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImV4cCI6MTU5OTc0NjU3NywiaWF0IjoxNTk0NTYyNTc3fQ.3V3BOh_y76LKhKoJn5foeaVMUZI9o9aGK6-J-BcvtHM"
}

result:{
    "id": "5f0b0941dd52e20fde467085",
    "username": "test",
    "email": "test@test.com",
    "exp": 1599746022,
    "iat": 1594562022
}
```

## Reference

https://thinkster.io/tutorials/node-json-api/creating-the-user-model


