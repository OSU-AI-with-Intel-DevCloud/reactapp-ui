use adminl
db.createUser(
  {
    user: "admin",
    pwd: "admin",
    roles: [ { role: "userAdminAnyDatabase", db: "admindb" }, "readWriteAnyDatabase" ]
  }
)
db.status.insertOne({"user": "active"});
