// The suites resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectAllSuites = require("../../queries/selectAllSuites");

//@route        GET api/v1/suites
//@desc         Get all suites by search term and order
//@access       Private

router.get("/", (req, res) => {
   console.log(req.query);
   const { filteredSuite } = req.query;
   let constructedFilteredSuite;
   if (filteredSuite === "" || filteredSuite === undefined) {
      constructedFilteredSuite = "%%";
   } else {
      constructedFilteredSuite = `%${filteredSuite}%`;
   }
   /* https://www.npmjs.com/package/mysql#escaping-query-values */
   db.query(selectAllSuites, [constructedFilteredSuite])
      .then((suites) => {
         //  console.log(suites);
         const camelCaseSuites = suites.map((suite) => {
            return {
               propertyId: suite.property_id,
               propertyName: suite.property_name, //??????
               propertyWebsite: suite.website,
               propertyAddress1: suite.address1,
               propertyAddress2: suite.address2,
               city: suite.city,
               state: suite.state,
               zip: suite.zip,
               country: suite.country,
               phoneCountryCode: suite.phone_country_code,
               phoneAreaCode: suite.phone_area_code,
               phoneNumber: suite.phone_number,
               selfParking: suite.self_parking,
               valetParking: suite.valet_parking,
               hasOutdoorPool: suite.has_outdoor_pool,
               hasSpa: suite.has_spa,
               isSmokeFree: suite.is_smoke_free,
               title: suite.title,
               id: suite.id,
               image: suite.image,
               squareFt: suite.square_ft,
               maxGuest: suite.max_guest,
               totalKingBed: suite.total_king_bed,
               totalQueenBed: suite.total_queen_bed,
               totalFullBed: suite.total_full_bed,
               hasWiFi: suite.has_wifi,
               hasTv: suite.has_tv,
               hasSafe: suite.has_safe,
               isAccessible: suite.is_accessible,
               isActive: suite.is_active,
            };
         });
         res.json(camelCaseSuites);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
