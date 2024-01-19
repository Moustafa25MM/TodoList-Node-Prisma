# TechHive application Server

## Installation

```bash
npm i
```

## Usage

```python
1. create a .env file in the root directory and add the following as an example:
MONGO_URL='mongodb://localhost:27017/TechHive'
PORT=4000
JWT_SECRET=TechHive

2. npm start -> to run the server
3. npm test -> to run tests

```

## How to use

### Reister User

```python
1. endpoint =   http://localhost:4000/user/create   "Or any port of your choice"

2. Provide the following example json in the body :
{     "name": "user1",
      "email": "user1@gmail.com",
      "password": "password",
}

It will return an object like this:
{
    "user": "user created successfully"
}
```

### Login

```python
1. endpoint = http://localhost:4000/user/login   "Or any port of your choice"
2. Provide the following example json in the body :
{
  "email":"user1@gmail.com",
    "password":"password"
}

It will return an object like this:
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWFiYWRkNDRhZjM2NWEyNmFjN2JiOSIsImlhdCI6MTcwNTY4Nzg0OCwiZXhwIjoxNzA2MjkyNjQ4fQ.z1qgY-FNSTOgfaIX_4RxXmH9voBnquVJtATz_FaK_Vs",
    "user": {
        "id": "65aabadd44af365a26ac7bb9",
        "name": "user1",
        "email": "user1@gmail.com"
    }
}
```

### Create Todo

```python
1. endpoint =   http://localhost:4000/todo/create   "Or any port of your choice"
2. you provide an Authorization token in the headres

3. Provide the following example json in the body :
{
    "name":"first Todo",
}

It will return an object like this:

{
    "msg": "Todo created successfully",
    "todo": {
        "id": "65aabb7f44af365a26ac7bba",
        "userId": "65aabadd44af365a26ac7bb9",
        "name": "first Todo",
        "isCompleted": false,
        "createdAt": "2024-01-19T18:12:15.378Z",
        "updatedAt": "2024-01-19T18:12:15.378Z"
    }
}
```

### Toggle Todo

```python
1. endpoint =    http://localhost:4000/todo/toggle/65aabb7f44af365a26ac7bba   "Or any port of your choice"
2. you provide an Authorization token in the headres

3. Provide the following example json in the body :
{
    "isCompleted":"true"
}
It will return an object like this:
{
    "msg": "Todo Updated Successfully",
    "todo": {
        "id": "65aabb7f44af365a26ac7bba",
        "userId": "65aabadd44af365a26ac7bb9",
        "name": "first Todo",
        "isCompleted": true,
        "createdAt": "2024-01-19T18:12:15.378Z",
        "updatedAt": "2024-01-19T18:13:45.193Z"
    }
}
```

### Update Todo

```python
1. endpoint =    http://localhost:4000/todo/update/65aabb7f44af365a26ac7bba   "Or any port of your choice"
2. you provide an Authorization token in the headres

3. Provide the following example json in the body :
{
    "name":"Second Todo"
}
It will return an object like this:
{
    "msg": "Todo updated successfully",
    "todo": {
        "id": "65aabb7f44af365a26ac7bba",
        "userId": "65aabadd44af365a26ac7bb9",
        "name": "Second Todo",
        "isCompleted": true,
        "createdAt": "2024-01-19T18:12:15.378Z",
        "updatedAt": "2024-01-19T18:15:41.269Z"
    }
}
```

### get All Todos

```python
1. endpoint =     http://localhost:4000/todo/find/all   "Or any port of your choice"
2. you provide an Authorization token in the headres

It will return an Array of objects like this:

[
    {
        "id": "65aabb7f44af365a26ac7bba",
        "userId": "65aabadd44af365a26ac7bb9",
        "name": "Second Todo",
        "isCompleted": true,
        "createdAt": "2024-01-19T18:12:15.378Z",
        "updatedAt": "2024-01-19T18:15:41.269Z"
    }
]
```

### get Todo By Id

```python
1. endpoint =     http://localhost:4000/todo/get/65aabb7f44af365a26ac7bba   "Or any port of your choice"
2. you provide an Authorization token in the headres

It will return an Object  like this:

{
    "id": "65aabb7f44af365a26ac7bba",
    "userId": "65aabadd44af365a26ac7bb9",
    "name": "Second Todo",
    "isCompleted": true,
    "createdAt": "2024-01-19T18:12:15.378Z",
    "updatedAt": "2024-01-19T18:15:41.269Z"
}
```

### get All Completed Todos

```python

1. endpoint = http://localhost:4000/todo/completed/all  "Or any port of your choice"
2. you provide an Authorization token in the headres

3. it will return an Array of objects like this :
[
    {
        "id": "65aabb7f44af365a26ac7bba",
        "userId": "65aabadd44af365a26ac7bb9",
        "name": "Second Todo",
        "isCompleted": true,
        "createdAt": "2024-01-19T18:12:15.378Z",
        "updatedAt": "2024-01-19T18:15:41.269Z"
    }
]
```

### get All InCompleted Todos

```python

1. endpoint = http://localhost:4000/todo/incompleted/all  "Or any port of your choice"
2. you provide an Authorization token in the headres

3. it will return an Array of objects like this :
[]
```

### delete Todo

```python
1. endpoint =    http://localhost:4000/todo/delete/65aabb7f44af365a26ac7bba   "Or any port of your choice"
2. you provide an Authorization token in the headres

3. it will return an object like this :
{
    "message": "Attendance deleted successfully"
}
```

### Logout.

```python
1. endpoint =     http://localhost:4000/user/logout   "Or any port of your choice"
2. you provide an Authorization token in the headres

3. it will return an array of objects like this :
{
    "message":"Logout Successfully"
}
```
