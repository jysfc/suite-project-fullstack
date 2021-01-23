// The users resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const insertUser = require("../../queries/insertUser");
const selectUserById = require("../../queries/selectUserById");
const { toHash } = require("../../utils/helpers");
const getSignUpEmailError = require("../../validation/getSignUpEmailError");
const getSignUpPasswordError = require("../../validation/getSignUpPasswordError");

//@route        POST api/v1/users
//@desc         Create a new user
//@access       Public
router.post("/", async (req, res) => {
   const { id, email, password, createdAt, isActive } = req.body;
   const emailError = await getSignUpEmailError(email);
   const passwordError = getSignUpPasswordError(password, email);
   if (emailError === "" && passwordError === "") {
      const user = {
         id, //id: id,
         email, //email: email,
         password: await toHash(password),
         created_at: createdAt,
         is_active: isActive,
      };

      db.query(insertUser, user)
         .then(() => {
            db.query(selectUserById, id)
               .then((users) => {
                  const user = users[0];
                  res.status(200).json({
                     id: user.id,
                     email: user.email,
                     createdAt: user.created_at,
                  });
               })
               .catch((err) => {
                  console.log(err);
                  res.status(400).json(
                     "something bad happened in the database."
                  );
               });
         })
         .catch((err) => {
            console.log(err);
            // return a 400 error to user
            res.status(400).json({ emailError, passwordError });
         });
   } else {
      res.status(400).json({ emailError, passwordError });
   }
});

module.exports = router;
