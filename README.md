CRUD application created using React, node.js, express and mySQL. [Deployed app!](https://crud-app-with-auth.netlify.app)
#### App functionalities:
* Creating account with email and password(length >=1). Password are safely stored hashed by bcrypt in mysql DB
* Authentication
* Access to Dashboard only for authenticated users
* In the Dashboard access to table with all users and coresponding data, and possibility to delete/block/unblock **EVERY** user (including currently logged user)
* Redirection to login screen after blocking/deleting current user

