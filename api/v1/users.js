// The users resource
require("dotenv").config();
const express = require("express");
const router = express.Router();
const db = require("../../db");
const insertUser = require("../../queries/insertUser");
const selectUserById = require("../../queries/selectUserById");
const selectUserByEmail = require("../../queries/selectUserByEmail");
const { toHash } = require("../../utils/helpers");
const getSignUpEmailError = require("../../validation/getSignUpEmailError");
const getSignUpPasswordError = require("../../validation/getSignUpPasswordError");
const getLoginEmailError = require("../../validation/getLoginEmailError");
const getLoginPasswordError = require("../../validation/getLoginPasswordError");
const jwt = require("jsonwebtoken");
// const uniqBy = require("lodash/uniqBy");

//@route        POST api/v1/users
//@desc         Create a new user
//@access       Public
router.post("/", async (req, res) => {
   const { id, email, password, createdAt, isActive } = req.body;
   const emailError = await getSignUpEmailError(email);
   const passwordError = getSignUpPasswordError(password, email);
   let dbError = "";
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
            db.query(selectUserById, id).then((users) => {
               const user = {
                  id: users[0].id,
                  email: users[0].email,
                  createdAt: users[0].created_at,
                  isActive: users[0].is_active,
               };
               const accessToken = jwt.sign(
                  user,
                  process.env.JWT_ACCESS_SECRET,
                  {}
               );
               res.status(200).json(accessToken);
            });
         })
         .catch((err) => {
            console.log(err);
            dbError = `${err.code} ${err.sqlMessage}`;
            res.status(400).json({ dbError });
         });
   } else {
      res.status(400).json({ emailError, passwordError });
   }
});

//@route        POST api/v1/users/auth
//@desc         Check this user against the db via email and password
//@access       Public
router.post("/auth", async (req, res) => {
   const { email, password } = req.body;
   const emailError = getLoginEmailError(email);
   const passwordError = await getLoginPasswordError(password, email);
   let dbError = "";
   if (emailError === "" && passwordError === "") {
      // return the user to the client
      db.query(selectUserByEmail, email)
         .then((users) => {
            const user = {
               id: users[0].id,
               email: users[0].email,
               createdAt: users[0].created_at,
               isActive: users[0].is_active,
            };
            // properties: uniqBy(
            //    user.map((user) => {
            //       return {
            //          name: user.property_name,
            //          id: user.property_id,
            //          website: user.website,
            //          address1: user.address1,
            //          address2: user.address2,
            //          city: user.city,
            //          state: user.state,
            //          zip: user.zip,
            //          country: user.country,
            //          phoneCountryCode: user.phone_country_code,
            //          phoneAreaCode: user.phone_area_code,
            //          phoneNumber: user.phone_number,
            //          selfParking: user.self_parking,
            //          valetParking: user.valet_parking,
            //          hasOutdoorPool: user.has_outdoor_pool,
            //          hasSpa: user.has_spa,
            //          isSmokeFree: user.is_smoke_free,
            //          isActive: user.property_is_active,
            //          suites: user.map((user) => {
            //             return {
            //                id: user.suite_id,
            //                title: user.suite_title,
            //                image: user.image,
            //                squareFt: user.square_ft,
            //                maxGuest: user.max_guest,
            //                totalKingBed: user.total_king_bed,
            //                totalQueenBed: user.total_queen_bed,
            //                totalFullBed: user.total_full_bed,
            //                hasWiFi: user.has_wifi,
            //                hasTv: user.has_tv,
            //                hasSafe: user.has_safe,
            //                isAccessible: user.is_accessible,
            //                isActive: user.suite_is_active,
            //             };
            //          }),
            //       };
            //    }),
            //    "user.property_id"
            // ),

            // const uniqUsers = uniqBy(formattedUsers, "id");
            // const oneUser = uniqUsers[0];
            // console.log(oneUser);
            const accessToken = jwt.sign(user, process.env.JWT_ACCESS_SECRET, {
               expiresIn: "480m",
            });

            return res.status(200).json(accessToken);
         })
         .catch((err) => {
            console.log(err);
            dbError = `${err.code} ${err.sqlMessage}`;
            return res.status(400).json({ dbError });
         });
   } else {
      res.status(400).json({ emailError, passwordError });
   }
});

module.exports = router;
