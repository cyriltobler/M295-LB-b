# M295 Leistungsbeurteilung B 
## Tasks
This project allows you to create and manage your own tasks after logging in with an e-mail of your choice and the password "m295". The exact commands are listed below.

## Endpoints

### Get All Tasks
``` bash
GET /tasks
```

### Create a Task
``` bash
POST /tasks
# Request sample
# {
#   "author":"Cyril",
#   "title":"Bahnhof"
# }
```

### Get a Task by ID
``` bash
GET /tasks/{id}
```

### Edit a Task by ID
``` bash
GET /tasks/{id}
# Request sample
# {
#   "title":"M295"
# }
```

### Delete a Task by ID
``` bash
DELETE /tasks/{id}
```

### Log In
``` bash
POST /login
# Request sample
# {
#   "email":"example@me.com"
#   "password":"m295"
# }
```
### Verify if user is logged in
``` bash
GET /verify
```
### Log out
``` bash
DELETE /logout
```

## Author
- [Cyril Tobler](https://github.com/cyriltobler)