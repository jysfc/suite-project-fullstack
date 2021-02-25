// The users resource
require("dotenv").config();
const express = require("express");
const router = express.Router();
const db = require("../../db");
const insertUser = require("../../queries/insertUser");
const selectUserById = require("../../queries/selectUserById");
const { toHash } = require("../../utils/helpers");
const getSignUpEmailError = require("../../validation/getSignUpEmailError");
const getSignUpPasswordError = require("../../validation/getSignUpPasswordError");
const getLoginEmailError = require("../../validation/getLoginEmailError");
const getLoginPasswordError = require("../../validation/getLoginPasswordError");
const jwt = require("jsonwebtoken");
const uniqBy = require("lodash/uniqBy");
const selectUserPropertySuites = require("../../queries/selectUserPropertySuites");
const updateProperty = require("../../queries/updateProperty");

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
   // console.log(req.body);
   const { email, password } = req.body;
   const emailError = getLoginEmailError(email);
   const passwordError = await getLoginPasswordError(password, email);
   let dbError = "";
   if (emailError === "" && passwordError === "") {
      // return the user to the client
      db.query(selectUserPropertySuites, email)
         .then((userPropertySuites) => {
            // console.log("this is the userpropsuite", userPropertySuites);
            const formattedUsers = uniqBy(
               userPropertySuites.map((userPropertySuite) => {
                  return {
                     id: userPropertySuite.user_id,
                     email: userPropertySuite.email,
                     createdAt: userPropertySuite.created_at,
                     isActive: userPropertySuite.user_is_active,
                     properties: uniqBy(
                        userPropertySuites.map((userPropertySuite) => {
                           const currentPropertyId =
                              userPropertySuite.property_id;
                           return {
                              userId: userPropertySuite.user_id,
                              name: userPropertySuite.property_name,
                              id: userPropertySuite.property_id,
                              website: userPropertySuite.website,
                              address1: userPropertySuite.address1,
                              address2: userPropertySuite.address2,
                              city: userPropertySuite.city,
                              state: userPropertySuite.state,
                              zip: userPropertySuite.zip,
                              country: userPropertySuite.country,
                              phoneCountryCode:
                                 userPropertySuite.phone_country_code,
                              phoneAreaCode: userPropertySuite.phone_area_code,
                              phoneNumber: userPropertySuite.phone_number,
                              selfParking: userPropertySuite.self_parking,
                              valetParking: userPropertySuite.valet_parking,
                              hasOutdoorPool:
                                 userPropertySuite.has_outdoor_pool,
                              hasSpa: userPropertySuite.has_spa,
                              isSmokeFree: userPropertySuite.is_smoke_free,
                              isActive: userPropertySuite.property_is_active,
                              suites: uniqBy(
                                 userPropertySuites
                                    .map((userPropertySuite) => {
                                       return {
                                          propertyId:
                                             userPropertySuite.property_id,
                                          id: userPropertySuite.suite_id,
                                          title: userPropertySuite.suite_title,
                                          image: userPropertySuite.image,
                                          squareFt: userPropertySuite.square_ft,
                                          maxGuest: userPropertySuite.max_guest,
                                          totalKingBed:
                                             userPropertySuite.total_king_bed,
                                          totalQueenBed:
                                             userPropertySuite.total_queen_bed,
                                          totalFullBed:
                                             userPropertySuite.total_full_bed,
                                          hasWiFi: userPropertySuite.has_wifi,
                                          hasTv: userPropertySuite.has_tv,
                                          hasSafe: userPropertySuite.has_safe,
                                          isAccessible:
                                             userPropertySuite.is_accessible,
                                          isActive:
                                             userPropertySuite.suite_is_active,
                                       };
                                    })
                                    .filter((suite) => {
                                       if (
                                          suite.propertyId === currentPropertyId
                                       )
                                          return true;
                                       else return false;
                                    }),
                                 "id"
                              ),
                           };
                        }),
                        "id"
                     ),
                  };
               }),
               "id"
            );
            console.log(JSON.stringify(formattedUsers, null, 3));
            const formattedUser = formattedUsers[0];
            const accessToken = jwt.sign(
               formattedUser,
               process.env.JWT_ACCESS_SECRET,
               {
                  expiresIn: "480m",
               }
            );

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

//@route        PUT api/v1/users/:id
//@desc         Update property info
//@access       Public
router.put("/:id", (req, res) => {
   // console.log(req.body);
   const id = req.params.properties.id;
   console.log(id);
   const user = req.user;
   const {
      email,
      createdAt,
      userIsActive,

      propertyId,
      name,
      website,
      address1,
      address2,
      city,
      state,
      zip,
      country,
      phoneCountryCode,
      phoneAreaCode,
      phoneNumber,
      selfParking,
      valetParking,
      hasOutdoorPool,
      hasSpa,
      isSmokeFree,
      propertyIsActive,

      suiteId,
      title,
      image,
      squareFt,
      maxGuest,
      totalKingBed,
      totalQueenBed,
      totalFullBed,
      hasWiFi,
      hasTv,
      hasSafe,
      isAccessible,
      suiteIsActive,
   } = req.body;
   const property = {
      user_id: user.id,
      email,
      created_at: createdAt,
      user_is_active: userIsActive,

      property_id: propertyId,
      property_name: name,
      website,
      address1,
      address2,
      city,
      state,
      zip,
      country,
      phone_country_code: phoneCountryCode,
      phone_area_code: phoneAreaCode,
      phone_number: phoneNumber,
      self_parking: selfParking,
      valet_parking: valetParking,
      has_outdoor_pool: hasOutdoorPool,
      has_spa: hasSpa,
      is_smoke_free: isSmokeFree,
      property_is_active: propertyIsActive,

      suite_id: suiteId,
      suite_title: title,
      image,
      square_ft: squareFt,
      max_guest: maxGuest,
      total_king_bed: totalKingBed,
      total_queen_bed: totalQueenBed,
      total_full_bed: totalFullBed,
      has_wifi: hasWiFi,
      has_tv: hasTv,
      has_safe: hasSafe,
      is_accessible: isAccessible,
      suite_is_active: suiteIsActive,
   };
   console.log(property);
   db.query(updateProperty, [property, id])
      .then((dbRes) => {
         //success
         console.log("Updated property in the db:", dbRes);
         //return with a status response
         return res.status(200).json({ success: "property updated" });
      })

      .catch((err) => {
         console.log(err);
         dbError = `${err.code} ${err.sqlMessage}`;
         return res.status(400).json({ dbError });
      });
});
module.exports = router;
