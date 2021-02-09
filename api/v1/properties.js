// The properties resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectUserPropertySuites = require("../../queries/selectUserPropertySuites");
const validateJwt = require("../../utils/validateJwt");

//@route        GET api/v1/properties
//@desc         Get all properties by user id
//@access       Private
router.get("/", validateJwt, (req, res) => {
   console.log(req.query);
   const userId = req.user.id;

   db.query(selectUserPropertySuites, userId)
      .then((userPropertySuites) => {
         //  console.log(userPropertySuites);
         const formattedUserPropertySuites = userPropertySuites.map(
            (userPropertySuite) => {
               return {
                  id: userPropertySuite.user_id,
                  email: userPropertySuite.email,
                  createdAt: userPropertySuite.created_at,
                  isActive: userPropertySuite.user_is_active,
                  properties: userPropertySuites.map((userPropertySuite) => {
                     return {
                        name: userPropertySuite.property_name,
                        id: userPropertySuite.property_id,
                        website: userPropertySuite.website,
                        address1: userPropertySuite.address1,
                        address2: userPropertySuite.address2,
                        city: userPropertySuite.city,
                        state: userPropertySuite.state,
                        zip: userPropertySuite.zip,
                        country: userPropertySuite.country,
                        phoneCountryCode: userPropertySuite.phone_country_code,
                        phoneAreaCode: userPropertySuite.phone_area_code,
                        phoneNumber: userPropertySuite.phone_number,
                        selfParking: userPropertySuite.self_parking,
                        valetParking: userPropertySuite.valet_parking,
                        hasOutdoorPool: userPropertySuite.has_outdoor_pool,
                        hasSpa: userPropertySuite.has_spa,
                        isSmokeFree: userPropertySuite.is_smoke_free,
                        suites: userPropertySuites.map((userPropertySuite) => {
                           return {
                              id: userPropertySuite.suite_id,
                              title: userPropertySuite.suite_title,
                              image: userPropertySuite.image,
                              squareFt: userPropertySuite.square_ft,
                              maxGuest: userPropertySuite.max_guest,
                              totalKingBed: userPropertySuite.total_king_bed,
                              totalQueenBed: userPropertySuite.total_queen_bed,
                              totalFullBed: userPropertySuite.total_full_bed,
                              hasWiFi: userPropertySuite.has_wifi,
                              hasTv: userPropertySuite.has_tv,
                              hasSafe: userPropertySuite.has_safe,
                              isAccessible: userPropertySuite.is_accessible,
                              isActive: userPropertySuite.suite_is_active,
                           };
                        }),
                     };
                  }),
               };
            }
         );

         return res.status(200).json(formattedUserPropertySuites);
      })
      .catch((err) => {
         console.log(err);
         return res.status(400).json(err);
      });
});

module.exports = router;
