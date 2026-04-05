const bcrypt = require("bcrypt");

const password = "123456"; // change this

bcrypt.hash(password, 10).then(hash => {
  console.log("Hashed Password:");
  console.log(hash);
});